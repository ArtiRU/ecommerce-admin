'use client';

import { ColumnDef } from '@tanstack/table-core';

export type OrderColumn = {
  address: string;
  createdAt: string;
  id: string;
  isPaid: boolean;
  phone: string;
  products: string;
  totalPrice: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'products',
    header: 'Products',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total price',
  },
  {
    accessorKey: 'isPaid',
    header: 'Status',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
];
