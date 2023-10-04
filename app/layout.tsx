import type { Metadata } from 'next';

import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
