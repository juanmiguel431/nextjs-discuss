'use client';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import React, { startTransition, useActionState, useCallback, useMemo } from 'react';
import * as actions from '@/actions';

type Props = Readonly<{
  slug: string;
}>;

export default function PostCreateForm({ slug }: Props) {

  const serverAction = useMemo(() => actions.createPost.bind(null, slug), [slug]);

  const [formState, action, isPending] = useActionState(serverAction, { errors: {}});

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }, [action]);

  return (
    <Form onSubmit={handleSubmit} validationBehavior="aria">
      <div className="flex flex-col gap-4 p-4 w-80">
        <h3 className="text-lg">Create a Post</h3>
        <Input
          name="title"
          label="Title"
          labelPlacement="outside"
          placeholder="Title"
          isInvalid={!!formState.errors.title}
          errorMessage={formState.errors.title?.join(', ')}
        />

        <Textarea
          name="content"
          label="Content"
          labelPlacement="outside"
          placeholder="Content"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(', ')}
        />

        {formState.errors._form && (
          <div className="p-2 bg-red-200 border border-red-400 rounded">
            {formState.errors._form?.join(', ')}
          </div>
        )}
        <Button
          type="submit"
          isLoading={isPending}>
          Submit
        </Button>
      </div>
    </Form>
  );
}
