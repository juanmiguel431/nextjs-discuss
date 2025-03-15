'use client';
import { Form } from '@heroui/form';
import { Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import React, { startTransition, useActionState, useCallback, useEffect, useMemo, useRef } from 'react';
import * as actions from '@/actions';

type Props = Readonly<{
  postId: string;
  parentId?: string;
  onSuccess?: () => void;
}>

export default function CommentCreateForm({ postId, parentId, onSuccess }: Props) {
  const serverAction = useMemo(() => actions.createComment.bind(null, { postId, parentId }), [postId, parentId]);
  const [formState, action, isPending] = useActionState(serverAction, { errors: {} });
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.success && onSuccess) {
      onSuccess();
    }
  }, [formState, onSuccess]);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }, [action]);

  return (
    <Form onSubmit={handleSubmit} validationBehavior="aria" ref={ref}>
      <div className="space-y-2 px-1 w-full">
        <Textarea
          name="content"
          placeholder="Enter your comment"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(', ')}
        />

        {formState.errors._form && (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(', ')}
          </div>
        )}

        <Button isLoading={isPending} type="submit">Create Comment</Button>
      </div>
    </Form>
  );
}
