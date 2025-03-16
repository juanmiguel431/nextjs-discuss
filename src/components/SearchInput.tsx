'use client';
import { Input } from '@heroui/input';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import * as actions from '@/actions';

export default function SearchInput() {
  return (
    <Suspense>
      <Search/>
    </Suspense>
  );
}

function Search() {
  const searchParam = useSearchParams();

  return (
    <form action={actions.search}>
      <Input
        defaultValue={searchParam.get('term') ?? ''}
        name="term"
      />
    </form>
  );
}
