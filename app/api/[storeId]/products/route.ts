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

    const {
      categoryId,
      colorId,
      images,
      isArchived,
      isFeatured,
      name,
      price,
      sizeId,
    } = await req.json();

    if (!name) {
      return new NextResponse('Field "name" is required', { status: 400 });
    }

    if (!price) {
      return new NextResponse('Field "price" is required', { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse('Field "categoryId" is required', {
        status: 400,
      });
    }
    if (!sizeId) {
      return new NextResponse('Field "sizeId" is required', { status: 400 });
    }
    if (!colorId) {
      return new NextResponse('Field "colorId" is required', { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse('Field "images" is required', { status: 400 });
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

    const product = await db.product.create({
      data: {
        categoryId,
        colorId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        isArchived,
        isFeatured,
        name,
        price,
        sizeId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('CREATE PRODUCT ERROR', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured') || undefined;

    if (!params.storeId) {
      return new NextResponse('Field "storeId" is required', { status: 400 });
    }

    const products = await db.product.findMany({
      include: {
        category: true,
        color: true,
        images: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        categoryId,
        colorId,
        isArchived: false,
        isFeatured: isFeatured ? true : undefined,
        sizeId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('GET PRODUCT ERROR', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
