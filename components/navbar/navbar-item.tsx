'use client';

import { MenuRoutesType } from '@/components/navbar/navbar-routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { FC } from 'react';

const NavbarItem: FC<MenuRoutesType> = ({ href, label }) => {
  const pathname = usePathname();
  const params = useParams();

  return (
    <Link
      className={cn(
        'text-sm font-bold',
        pathname === `/${params.storeId}${href && '/' + href}`
          ? 'text-black dark:text-white'
          : 'text-muted-foreground',
      )}
      href={`/${params.storeId}/${href}`}
    >
      {label}
    </Link>
  );
};

export default NavbarItem;
