import CategoryClient from '@/app/(dashboard)/[storeId]/(routes)/categories/component/category-client';
import { CategoryColumn } from '@/app/(dashboard)/[storeId]/(routes)/categories/component/category-columns';
import { db } from '@/lib/db';
import { format } from 'date-fns';
import { FC } from 'react';

const CategoriesPage: FC<{ params: { storeId: string } }> = async ({
  params,
}) => {
  const categories = await db.category.findMany({
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      storeId: params.storeId,
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, 'dd MMMM, yyyy'),
    id: category.id,
    name: category.name,
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
