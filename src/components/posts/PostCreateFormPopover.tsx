'use client';
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Button } from '@heroui/button';
import PostCreateForm from '@/components/posts/PostCreateForm';

type Props = Readonly<{
  slug: string;
}>

export default function PostCreateFormPopover({ slug }: Props) {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PostCreateForm slug={slug}/>
      </PopoverContent>
    </Popover>
  );
}
