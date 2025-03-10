'use client';
import { PropsWithChildren } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: Readonly<PropsWithChildren>) {
  return (
    <SessionProvider>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </SessionProvider>
  );
}
