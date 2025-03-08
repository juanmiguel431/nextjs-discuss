'use client';
import { HeroUIProvider } from '@heroui/react';
import { PropsWithChildren } from 'react';

export default function Provider({ children }: Readonly<PropsWithChildren>) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
}
