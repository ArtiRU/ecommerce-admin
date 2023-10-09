import BillboardClient from '@/app/(dashboard)/[storeId]/(routes)/billboards/component/billboard-client';
import { FC } from 'react';

const BillboardsPage: FC = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
};

export default BillboardsPage;
