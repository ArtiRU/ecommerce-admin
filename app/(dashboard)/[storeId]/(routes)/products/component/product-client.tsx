'use client';

import {
  ProductColumn,
  columns,
} from '@/app/(dashboard)/[storeId]/(routes)/products/component/product-columns';
import ApiList from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient: FC<ProductClientProps> = ({ data }) => {
  const { push } = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage products for your store"
          title={`Products (${data.length})`}
        />
        <Button onClick={() => push(`/${params.storeId}/products/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading description="API calls for Products" title="API" />
      <Separator />
      <ApiList entityIdName="productId" entityName="products" />
    </>
  );
};

export default ProductClient;
