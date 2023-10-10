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

    const { billboardId, name } = await req.json();

    if (!name) {
      return new NextResponse('Field "Name" is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Field "billboardId" is required', {
        status: 400,
      });
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

    const category = await db.category.create({
      data: {
        billboardId,
        name,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('CREATE CATEGORIES ERROR', error);
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

    const categories = await db.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log('GET CATEGORIES ERROR', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
