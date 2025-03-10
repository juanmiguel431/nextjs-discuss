'use client'
import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Input } from '@heroui/input';
import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import { useSession } from 'next-auth/react';
import path from '@/path';
import * as actions from '@/actions';
import SignOut from '@/components/SignOut';
import React from 'react';
import styles from './style.module.css';
import clsx from "clsx";

export default function Header() {
  const { data, status } = useSession();

  let authContent: React.ReactNode;

  if (status === 'loading') {
    authContent = (
      <div className="flex justify-between gap-2">
        Loading... <div className={clsx(styles.cube, 'text-center')}></div>
      </div>
    );
  } else {
    authContent = data?.user ? (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={data.user.image ?? ''}/>
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <SignOut/>
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
  }

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
