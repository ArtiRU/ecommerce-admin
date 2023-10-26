import OrderClient from '@/app/(dashboard)/[storeId]/(routes)/orders/component/order-client';
import { OrderColumn } from '@/app/(dashboard)/[storeId]/(routes)/orders/component/order-columns';
import { db } from '@/lib/db';
import { priceFormatter } from '@/lib/utils';
import { format } from 'date-fns';
import { FC } from 'react';

const OrdersPage: FC<{ params: { storeId: string } }> = async ({ params }) => {
  const orders = await db.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      storeId: params.storeId,
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    address: order.address,
    createdAt: format(order.createdAt, 'dd MMMM, yyyy'),
    id: order.id,
    isPaid: order.isPaid,
    phone: order.phone,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(', '),
    totalPrice: priceFormatter.format(
      order.orderItems.reduce(
        (total, item) => total + Number(item.product.price),
        0,
      ),
    ),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
