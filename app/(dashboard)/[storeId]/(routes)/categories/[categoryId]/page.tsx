import CategoryForm from '@/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/component/category-form';
import { db } from '@/lib/db';
import { FC } from 'react';

const CategoryPage: FC<{
  params: { categoryId: string; storeId: string };
}> = async ({ params }) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
