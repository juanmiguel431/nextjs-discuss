import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostWithData = Post & {
  topic: { slug: string; };
  user: { name: string | null; image: string | null };
  _count: { comments: number; };
}

// export type PostWithData = Awaited<
//   ReturnType<typeof fetchPostByTopicSlug>
// >[number];

export function fetchPostByTopicSlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: { topic: { slug }},
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    }
  });
}

export async function fetchTopPosts(): Promise<PostWithData[]> {
  return db.post.findMany({
    orderBy: {
      comments: {
        _count: 'desc'
      }
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    take: 5
  });
}

export async function fetchPostBySearchTerm(term: string): Promise<PostWithData[]> {
  return db.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    where: {
      OR: [
        { title: { contains: term } },
        { content: { contains: term } },
      ],
    }
  });
}
