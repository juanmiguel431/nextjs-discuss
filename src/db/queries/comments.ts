'use server';
import { db } from '@/db';
import type { Comment } from '@prisma/client'
import { cache } from 'react';

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
}

export const fetchCommentsByPostId = cache(async (postId: string): Promise<CommentWithAuthor[]> => {
  console.count('Making a query');
  return db.comment.findMany({
    where: { postId: postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
});
