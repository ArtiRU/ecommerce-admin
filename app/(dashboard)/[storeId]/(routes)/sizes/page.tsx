import SizeClient from '@/app/(dashboard)/[storeId]/(routes)/sizes/component/size-client';
import { SizeColumn } from '@/app/(dashboard)/[storeId]/(routes)/sizes/component/size-columns';
import { db } from '@/lib/db';
import { format } from 'date-fns';
import { FC } from 'react';

const SizesPage: FC<{ params: { storeId: string } }> = async ({ params }) => {
  const sizes = await db.size.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      storeId: params.storeId,
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((size) => ({
    createdAt: format(size.createdAt, 'dd MMMM, yyyy'),
    id: size.id,
    name: size.name,
    value: size.value,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
