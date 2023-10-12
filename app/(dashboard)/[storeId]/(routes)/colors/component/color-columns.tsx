'use client';

import ColorCellAction from '@/app/(dashboard)/[storeId]/(routes)/colors/component/color-cell-action';
import { ColumnDef } from '@tanstack/table-core';

export type ColorColumn = {
  createdAt: string;
  id: string;
  name: string;
  value: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    cell: ({ row }) => (
      <div className="w-[100px]">
        <div className="flex items-center gap-x-2 justify-between">
          {row.original.value}
          <div
            className="w-6 h-6 border-full border"
            style={{ backgroundColor: row.original.value }}
          />
        </div>
      </div>
    ),
    header: 'Value',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    cell: ({ row }) => <ColorCellAction data={row.original} />,
    id: 'actions',
  },
];
