import ProductForm from '@/app/(dashboard)/[storeId]/(routes)/products/[productId]/component/product-form';
import { db } from '@/lib/db';
import { FC } from 'react';

const ProductPage: FC<{
  params: { productId: string; storeId: string };
}> = async ({ params }) => {
  const product = await db.product.findUnique({
    include: {
      images: true,
    },
    where: {
      id: params.productId,
    },
  });
  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          initialData={product}
          sizes={sizes}
        />
      </div>
    </div>
  );
};

export default ProductPage;
