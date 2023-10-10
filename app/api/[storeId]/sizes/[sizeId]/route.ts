import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } },
) {
  try {
    if (!params.sizeId) {
      return new NextResponse('Params "sizeId" is required', {
        status: 400,
      });
    }

    const size = await db.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('GET SIZE', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name, value } = await req.json();

    if (!name) {
      return new NextResponse('Field "name" is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Field "value" is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Params "storeId" is required', { status: 400 });
    }

    if (!params.sizeId) {
      return new NextResponse('Params "sizeId" is required', {
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

    const size = await db.size.updateMany({
      data: {
        name,
        value,
      },
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('PATCH SIZE', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse('Params "sizeId" is required', {
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

    const size = await db.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('DELETE SIZE', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
