import SizeForm from '@/app/(dashboard)/[storeId]/(routes)/sizes/[sizeId]/component/size-form';
import { db } from '@/lib/db';
import { FC } from 'react';

const SizePage: FC<{
  params: { sizeId: string };
}> = async ({ params }) => {
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
