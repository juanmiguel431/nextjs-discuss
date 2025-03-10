'use client';
import { useSession } from 'next-auth/react';
import React from 'react';
import clsx from 'clsx';
import styles from '@/components/style.module.css';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Avatar } from '@heroui/avatar';
import SignOut from '@/components/SignOut';
import { NavbarItem } from '@heroui/navbar';
import * as actions from '@/actions';
import { Button } from '@heroui/button';

export default function HeaderAuth() {
  const { data, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex justify-between gap-2">
        Loading... <div className={clsx(styles.cube, 'text-center')}></div>
      </div>
    );
  }

  if (data?.user) {
    return (
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
    );
  }

  return (
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
  );
}
