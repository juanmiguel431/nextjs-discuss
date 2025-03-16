import Image from 'next/image';
import { fetchCommentsByPostId } from '@/db/queries/comments';
import CommentCreateFormButton from '@/components/comments/CommentCreateFormButton';

type Props = Readonly<{
  commentId: string;
  postId: string;
}>

export default async function CommentShow({ commentId, postId }: Props) {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image ?? ''}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>

          <CommentCreateFormButton
            postId={comment.postId}
            parentId={comment.id}
          />
        </div>
      </div>
      <div className="pl-4">
        {children.map((child) => (
          <CommentShow key={child.id} commentId={child.id} postId={postId}/>
        ))}
      </div>
    </div>
  );
}
