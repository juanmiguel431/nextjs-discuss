import CommentShow from '@/components/comments/CommentShow';
import { CommentWithAuthor } from '@/db/queries/comments';

type Props = Readonly<{
  fetchData: () => Promise<CommentWithAuthor[]>;
}>

export default async function CommentList({ fetchData }: Props) {
  const comments = await fetchData();
  const topLevelComments = comments.filter((comment) => comment.parentId === null);

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {topLevelComments.map((comment) => (
        <CommentShow
          key={comment.id}
          commentId={comment.id}
          comments={comments}
        />
      ))}
    </div>
  );
}
