'use client';

import CategoryCellAction from '@/app/(dashboard)/[storeId]/(routes)/categories/component/category-cell-action';
import { ColumnDef } from '@tanstack/table-core';

export type CategoryColumn = {
  billboardLabel: string;
  createdAt: string;
  id: string;
  name: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'billboard',
    cell: ({ row }) => row.original.billboardLabel,
    header: 'Billboard',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    cell: ({ row }) => <CategoryCellAction data={row.original} />,
    id: 'actions',
  },
];
