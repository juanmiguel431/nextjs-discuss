'use client';
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Button } from '@heroui/button';
import TopicCreateForm from '@/components/topics/TopicCreateForm';

export default function TopicCreateFormPopover() {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <TopicCreateForm />
      </PopoverContent>
    </Popover>
  );
}
