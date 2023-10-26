import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    if (!params.categoryId) {
      return new NextResponse('Params "CategoryId" is required', {
        status: 400,
      });
    }

    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('GET CATEGORY', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { billboardId, name } = await req.json();

    if (!name) {
      return new NextResponse('Field "name" is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Field "billboardId" is required', {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new NextResponse('Params "storeId" is required', { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse('Params "categoryId" is required', {
        status: 400,
      });
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

    const category = await db.category.updateMany({
      data: {
        billboardId,
        name,
      },
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('PATCH CATEGORY', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse('Params "categoryId" is required', {
        status: 400,
      });
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

    const category = await db.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('DELETE CATEGORY', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
