import ProductClient from '@/app/(dashboard)/[storeId]/(routes)/products/component/product-client';
import { ProductColumn } from '@/app/(dashboard)/[storeId]/(routes)/products/component/product-columns';
import { db } from '@/lib/db';
import { priceFormatter } from '@/lib/utils';
import { format } from 'date-fns';
import { FC } from 'react';

const ProductsPage: FC<{ params: { storeId: string } }> = async ({
  params,
}) => {
  const products = await db.product.findMany({
    include: {
      category: true,
      color: true,
      size: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      storeId: params.storeId,
    },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    category: product.category.name,
    color: product.color.value,
    createdAt: format(product.createdAt, 'dd MMMM, yyyy'),
    id: product.id,
    isArchived: product.isArchived,
    isFeatured: product.isFeatured,
    name: product.name,
    price: priceFormatter.format(product.price.toNumber()),
    size: product.size.name,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
