import SettingsForm from '@/app/(dashboard)/[storeId]/(routes)/settings/components/settings-form';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    return redirect('/');
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
