import ColorClient from '@/app/(dashboard)/[storeId]/(routes)/colors/component/color-client';
import { ColorColumn } from '@/app/(dashboard)/[storeId]/(routes)/colors/component/color-columns';
import { db } from '@/lib/db';
import { format } from 'date-fns';
import { FC } from 'react';

const ColorPage: FC<{ params: { storeId: string } }> = async ({ params }) => {
  const colors = await db.color.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      storeId: params.storeId,
    },
  });

  const formattedColors: ColorColumn[] = colors.map((size) => ({
    createdAt: format(size.createdAt, 'dd MMMM, yyyy'),
    id: size.id,
    name: size.name,
    value: size.value,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorPage;
