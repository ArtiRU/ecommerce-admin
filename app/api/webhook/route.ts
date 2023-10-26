import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { OrderItem } from '@prisma/client';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(', ');

  if (event.type === 'checkout.session.completed') {
    const order = await db.order.update({
      data: {
        address: addressString,
        isPaid: true,
        phone: session?.customer_details?.phone || '',
      },
      include: {
        orderItems: true,
      },
      where: {
        id: session?.metadata?.orderId,
      },
    });

    const productIds = order.orderItems.map(
      (orderItem: OrderItem) => orderItem.productId,
    );

    await db.product.updateMany({
      data: {
        isArchived: true,
      },
      where: {
        id: {
          in: [...productIds],
        },
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
