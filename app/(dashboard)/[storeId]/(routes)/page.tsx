import { db } from '@/lib/db';
import { FC } from 'react';

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: FC<DashboardPageProps> = async ({
  params: { storeId },
}) => {
  const store = await db.store.findFirst({
    where: {
      id: storeId,
    },
  });
  return <div>Active store: {store?.name}</div>;
};

export default DashboardPage;
