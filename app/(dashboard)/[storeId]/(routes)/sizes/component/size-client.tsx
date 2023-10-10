'use client';

import {
  SizeColumn,
  columns,
} from '@/app/(dashboard)/[storeId]/(routes)/sizes/component/size-columns';
import ApiList from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';

interface SizeClientProps {
  data: SizeColumn[];
}

const SizeClient: FC<SizeClientProps> = ({ data }) => {
  const { push } = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage sizes for your store"
          title={`Sizes (${data.length})`}
        />
        <Button onClick={() => push(`/${params.storeId}/sizes/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading description="API calls for Sizes" title="API" />
      <Separator />
      <ApiList entityIdName="sizeId" entityName="sizes" />
    </>
  );
};

export default SizeClient;
