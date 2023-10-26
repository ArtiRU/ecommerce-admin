import Navbar from '@/components/navbar/navbar';
import StoreSwitcher from '@/components/store-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { db } from '@/lib/db';
import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { FC } from 'react';

const Header: FC = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <Navbar className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default Header;
