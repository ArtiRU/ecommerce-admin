import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { FC, ReactNode } from 'react';

interface StoreIdLayoutProps {
  children: ReactNode;
  params: { storeId: string };
}

const StoreIdLayout: FC<StoreIdLayoutProps> = async ({ children, params }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  const store = await db.store.findFirst({
    where: {
      id: params?.storeId,
      userId,
    },
  });

  if (!store) {
    return redirect('/');
  }
  return (
    <>
      <div>dashboard</div>
      {children}
    </>
  );
};

export default StoreIdLayout;
