'use client';

import SizeCellAction from '@/app/(dashboard)/[storeId]/(routes)/sizes/component/size-cell-action';
import { ColumnDef } from '@tanstack/table-core';

export type SizeColumn = {
  createdAt: string;
  id: string;
  name: string;
  value: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    cell: ({ row }) => <SizeCellAction data={row.original} />,
    id: 'actions',
  },
];
