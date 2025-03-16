import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import SearchInput from '@/components/SearchInput';
import path from '@/path';
import React from 'react';
import HeaderAuth from '@/components/HeaderAuth';

export default function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href={path.home()}>Discuss</Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <SearchInput/>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth/>
      </NavbarContent>
    </Navbar>
  );
}
