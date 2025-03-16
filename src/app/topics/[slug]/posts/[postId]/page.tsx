import Link from 'next/link';
import PostShow from '@/components/posts/PostShow';
import CommentList from '@/components/comments/CommentList';
import CommentCreateFormButton from '@/components/comments/CommentCreateFormButton';
import paths from '@/path';
import React, { Suspense } from 'react';
import { Spinner } from '@heroui/spinner';

type Props = Readonly<{
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}>

export default async function PostShowPage({ params }: Props) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {'< '}Back to {slug}
      </Link>

      <Suspense fallback={(
        <div className="m-4">
          <Spinner/>
        </div>
      )}>
        <PostShow postId={postId}/>
      </Suspense>

      <CommentCreateFormButton postId={postId} startOpen/>
      <CommentList postId={postId}/>
    </div>
  );
}
