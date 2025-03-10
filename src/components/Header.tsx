import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Input } from '@heroui/input';
import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import { auth } from '@/auth';
import path from '@/path';
import * as actions from '@/actions';
import SignOut from '@/components/SignOut';

export default async function Header() {
  const session = await auth();

  const authContent = session?.user ? (
    <Popover placement="left">
      <PopoverTrigger>
        <Avatar src={session.user.image ?? ''}/>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <SignOut />
        </div>
      </PopoverContent>
    </Popover>
  ) : (
    <>
      <NavbarItem>
        <form action={actions.signIn}>
          <Button type="submit" color="secondary" variant="bordered">
            Sign In
          </Button>
        </form>
      </NavbarItem>
      <NavbarItem>
        <form action={actions.signIn}>
          <Button type="submit" color="secondary" variant="flat">
            Sign Up
          </Button>
        </form>
      </NavbarItem>
    </>
  )

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href={path.home()}>Discuss</Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input/>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {authContent}
      </NavbarContent>
    </Navbar>
  );
}
