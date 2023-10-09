import BillboardClient from '@/app/(dashboard)/[storeId]/(routes)/billboards/component/billboard-client';
import { BillboardColumn } from '@/app/(dashboard)/[storeId]/(routes)/billboards/component/billboard-columns';
import { db } from '@/lib/db';
import { format } from 'date-fns';
import { FC } from 'react';

const BillboardsPage: FC<{ params: { storeId: string } }> = async ({
  params,
}) => {
  const billboards = await db.billboard.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      storeId: params.storeId,
    },
  });

  const formattedBillboard: BillboardColumn[] = billboards.map((billboard) => ({
    createdAt: format(billboard.createdAt, 'dd MMMM, yyyy'),
    id: billboard.id,
    label: billboard.label,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboard} />
      </div>
    </div>
  );
};

export default BillboardsPage;
