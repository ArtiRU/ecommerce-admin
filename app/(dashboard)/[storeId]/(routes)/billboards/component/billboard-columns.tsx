'use client';

import BillboardCellAction from '@/app/(dashboard)/[storeId]/(routes)/billboards/component/billboard-cell-action';
import { ColumnDef } from '@tanstack/table-core';

export type BillboardColumn = {
  createdAt: string;
  id: string;
  label: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    cell: ({ row }) => <BillboardCellAction data={row.original} />,
    id: 'actions',
  },
];
