import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import React, { startTransition, useActionState, useCallback } from 'react';
import * as actions from '@/actions';

export default function TopicCreateForm() {
  const [formState, action] = useActionState(actions.createTopic, { errors: {}});

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }, [action]);

  return (
    <Form onSubmit={handleSubmit} validationBehavior="aria">
      <div className="flex flex-col gap-4 p-4 w-80">
        <h3 className="text-lg">Create a Topic</h3>
        <Input
          name="name"
          label="name"
          labelPlacement="outside"
          placeholder="Name"
          isInvalid={!!formState.errors.name}
          errorMessage={formState.errors.name?.join(', ')}
        />

        <Textarea
          name="description"
          label="description"
          labelPlacement="outside"
          placeholder="Describe your topic"
          isInvalid={!!formState.errors.description}
          errorMessage={formState.errors.description?.join(', ')}
        />

        {formState.errors._form && (
          <div className="p-2 bg-red-200 border border-red-400 rounded">
            {formState.errors._form?.join(', ')}
          </div>
        )}
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}
