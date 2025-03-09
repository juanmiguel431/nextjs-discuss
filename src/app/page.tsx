import { Button } from '@heroui/button';
import * as actions from '@/actions';
import { auth } from '@/auth';

export default async function Home() {

  const session = await auth();

  return (
    <div>

      <div className="p-4 bg-blue-500 text-white text-center">
        ¡Tailwind works!
      </div>

      <form action={actions.signIn}>
        <Button type="submit">Sign in</Button>
      </form>

      <form action={actions.signOut}>
        <Button type="submit">Sign out</Button>
      </form>

      {session?.user ? (
        <div>{JSON.stringify(session.user)}</div>
      ) : (
        <div>Signed Out</div>
      )}
    </div>
  );
}
