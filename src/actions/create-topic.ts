'use server';
import { z } from 'zod';
import { auth } from '@/auth';
import type { Topic } from '@prisma/client';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/path';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
  name: z.string().min(3.).regex(/^[a-z-]+$/, {
    message: 'Must be lowercase letters or dashes without spaces'
  }),
  description: z.string().min(10),
})

export type CreateTopicFormState = {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  }
}

export async function createTopic(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {
  await new Promise(r => setTimeout(r, 1000));
  const session = await auth();
  if (!session?.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      }
    };
  }

  const result = await createTopicSchema.safeParseAsync({
    name: formData.get('name'),
    description: formData.get('description')
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      }
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message]
        }
      }
    }

    return {
      errors: {
        _form: ['Something went wrong'],
      }
    }
  }

  revalidatePath('/');
  redirect(paths.topicShow(topic.slug))
}
