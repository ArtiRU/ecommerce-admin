import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    const { name, value } = await req.json();

    if (!name) {
      return new NextResponse('Field "name" is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Field "value" is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Field "storeId" is required', { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const size = await db.size.create({
      data: {
        name,
        storeId: params.storeId,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('CREATE SIZE ERROR', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Field "storeId" is required', { status: 400 });
    }

    const sizes = await db.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log('GET BILLBOARD ERROR', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
