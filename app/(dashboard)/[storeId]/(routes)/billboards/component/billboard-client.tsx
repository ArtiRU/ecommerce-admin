'use client';

import {
  BillboardColumn,
  columns,
} from '@/app/(dashboard)/[storeId]/(routes)/billboards/component/billboard-columns';
import ApiList from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: FC<BillboardClientProps> = ({ data }) => {
  const { push } = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage billboards for your store"
          title={`Billboards (${data.length})`}
        />
        <Button onClick={() => push(`/${params.storeId}/billboards/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading description="API calls for Billboards" title="API" />
      <Separator />
      <ApiList entityIdName="billboardId" entityName="billboards" />
    </>
  );
};

export default BillboardClient;
