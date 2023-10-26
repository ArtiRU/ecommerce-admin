'use client';

import {
  OrderColumn,
  columns,
} from '@/app/(dashboard)/[storeId]/(routes)/orders/component/order-columns';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { FC } from 'react';

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        description="Manage orders for your store"
        title={`Orders (${data.length})`}
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};

export default OrderClient;
