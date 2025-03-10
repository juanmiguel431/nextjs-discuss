import { auth } from '@/auth';
import Profile from '@/components/Profile';

export default async function Home() {
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <div>From server: {JSON.stringify(session.user)}</div>
      ) : (
        <div>From server: Signed Out</div>
      )}

      <br/>
      <Profile/>
    </div>
  );
}
