import BillboardForm from '@/app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/component/billboard-form';
import { db } from '@/lib/db';
import { FC } from 'react';

const BillboardPage: FC<{
  params: { billboardId: string };
}> = async ({ params }) => {
  const billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
