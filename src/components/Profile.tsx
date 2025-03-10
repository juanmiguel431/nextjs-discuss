'use client';
import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data, status } = useSession();
  console.log({ status });

  if (data?.user) {
    return (
      <div>
        <div>From client: {JSON.stringify(data.user)}</div>
      </div>
    )
  }

  return (
    <div>From client: user is NOT signed in</div>
  );
}
