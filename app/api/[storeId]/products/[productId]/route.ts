import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    if (!params.productId) {
      return new NextResponse('Params "productId" is required', {
        status: 400,
      });
    }

    const product = await db.product.findUnique({
      include: {
        category: true,
        color: true,
        images: true,
        size: true,
      },
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('GET PRODUCT', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
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

    if (!params.productId) {
      return new NextResponse('Params "productId" is required', {
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

    await db.product.update({
      data: {
        categoryId,
        colorId,
        images: {
          deleteMany: {},
        },
        isArchived,
        isFeatured,
        name,
        price,
        sizeId,
      },
      where: {
        id: params.productId,
      },
    });

    const product = await db.product.update({
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('PATCH PRODUCT', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse('Params "productId" is required', {
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

    const product = await db.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('DELETE PRODUCT', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
