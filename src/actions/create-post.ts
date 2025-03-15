'use server';
import { z } from 'zod';
import { auth } from '@/auth';
import type { Post } from '@prisma/client';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/path';
import { revalidatePath } from 'next/cache';

const createPostSchema = z.object({
  title: z.string().min(3.),
  content: z.string().min(10),
})

export type CreatePostFormState = {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  }
}

export async function createPost(slug: string, formState: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {

  if (!slug) {
    return {
      errors: {
        _form: ['Slug should not be empty.'],
      }
    };
  }

  await new Promise(r => setTimeout(r, 1000));

  const session = await auth();
  if (!session?.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      }
    };
  }

  const result = await createPostSchema.safeParseAsync({
    title: formData.get('title'),
    content: formData.get('content')
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    };
  }

  let post: Post;
  try {
    const topic = await db.topic.findFirstOrThrow({
      where: {
        slug: slug,
      }
    });

    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id!,
        topicId: topic.id,
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

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}
