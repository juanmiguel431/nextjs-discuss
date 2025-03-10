'use client';
import { Button } from '@heroui/button';
import { signOut } from 'next-auth/react';

export default function SignOut() {
  return (
    <Button
      onPress={() => signOut()}>
      Sign Out
    </Button>
  );
}
