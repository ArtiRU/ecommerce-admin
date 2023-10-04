import type { Metadata } from 'next';

import ModalProvider from '@/providers/modal-provider';
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
        <body className={inter.className}>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
