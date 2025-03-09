'use client';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@heroui/button';

export default function Profile() {
  const { data, status } = useSession();
  console.log({ status });

  if (data?.user) {
    return (
      <div>
        <div>From client: {JSON.stringify(data.user)}</div>
        <Button
          onPress={() => signOut()}>
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <div>From client: user is NOT signed in</div>
  );
}
