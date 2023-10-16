'use client';

import ProductCellAction from '@/app/(dashboard)/[storeId]/(routes)/products/component/product-cell-action';
import { ColumnDef } from '@tanstack/table-core';

export type ProductColumn = {
  category: string;
  color: string;
  createdAt: string;
  id: string;
  isArchived: boolean;
  isFeatured: boolean;
  name: string;
  price: string;
  size: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'color',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
    header: 'Color',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    cell: ({ row }) => <ProductCellAction data={row.original} />,
    id: 'actions',
  },
];
