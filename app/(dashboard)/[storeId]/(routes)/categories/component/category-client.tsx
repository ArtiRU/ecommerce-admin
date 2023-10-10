'use client';

import {
  CategoryColumn,
  columns,
} from '@/app/(dashboard)/[storeId]/(routes)/categories/component/category-columns';
import ApiList from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';

interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoryClient: FC<CategoryClientProps> = ({ data }) => {
  const { push } = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage categories for your store"
          title={`Categories (${data.length})`}
        />
        <Button onClick={() => push(`/${params.storeId}/categories/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading description="API calls for Categories" title="API" />
      <Separator />
      <ApiList entityIdName="categoryId" entityName="categories" />
    </>
  );
};

export default CategoryClient;
