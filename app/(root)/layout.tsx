import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

const SetupPageLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  const store = await db.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    return redirect(`/${store?.id}`);
  }

  return <>{children}</>;
};

export default SetupPageLayout;
