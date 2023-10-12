import ColorForm from '@/app/(dashboard)/[storeId]/(routes)/colors/[colorId]/component/color-form';
import { db } from '@/lib/db';
import { FC } from 'react';

const ColorPage: FC<{
  params: { colorId: string };
}> = async ({ params }) => {
  const color = await db.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
