import CommentShow from '@/components/comments/CommentShow';
import { fetchCommentsByPostId } from '@/db/queries/comments';

type Props = Readonly<{
  postId: string;
}>

export default async function CommentList({ postId }: Props) {
  const comments = await fetchCommentsByPostId(postId);
  const topLevelComments = comments.filter((comment) => comment.parentId === null);

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {topLevelComments.map((comment) => (
        <CommentShow
          key={comment.id}
          commentId={comment.id}
          postId={postId}
        />
      ))}
    </div>
  );
}
