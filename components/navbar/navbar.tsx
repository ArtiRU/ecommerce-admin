'use client';

import NavbarItem from '@/components/navbar/navbar-item';
import { menuRoutes } from '@/components/navbar/navbar-routes';
import { cn } from '@/lib/utils';
import { FC, HTMLAttributes } from 'react';

const Navbar: FC<HTMLAttributes<HTMLElement>> = ({ className, ...props }) => {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {menuRoutes.map((route) => (
        <NavbarItem href={route.href} key={route.href} label={route.label} />
      ))}
    </nav>
  );
};

export default Navbar;
