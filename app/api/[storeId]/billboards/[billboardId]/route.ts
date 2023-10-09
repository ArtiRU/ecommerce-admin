import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } },
) {
  try {
    if (!params.billboardId) {
      return new NextResponse('Params "billboardId" is required', {
        status: 400,
      });
    }

    const billboard = await db.store.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('GET BILLBOARD', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { imageUrl, label } = await req.json();

    if (!label) {
      return new NextResponse('Field "label" is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Field "imageUrl" is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Params "storeId" is required', { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse('Params "billboardId" is required', {
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

    const billboard = await db.billboard.updateMany({
      data: {
        imageUrl,
        label,
      },
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('PATCH BILLBOARD', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse('Params "billboardId" is required', {
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

    const billboard = await db.billboard.delete({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('DELETE BILLBOARD', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
