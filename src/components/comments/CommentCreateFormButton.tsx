'use client';
import React, { useCallback, useState } from 'react';
import { Button } from '@heroui/button';
import CommentCreateForm from '@/components/comments/CommentCreateForm';

type Props = Readonly<{
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}>

export default function CommentCreateFormButton({ postId, parentId, startOpen, }: Props) {
  const [open, setOpen] = useState(startOpen);

  const onSuccess = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div>
      <Button size="sm" variant="light" onPress={() => setOpen(!open)}>
        Reply
      </Button>
      {open && (
        <CommentCreateForm
          postId={postId}
          parentId={parentId}
          onSuccess={onSuccess}
        />
      )}
    </div>
  );
}
