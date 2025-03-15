import PostCreateFormPopover from '@/components/posts/PostCreateFormPopover';
import { fetchPostByTopicSlug } from '@/db/queries/post';
import PostList from '@/components/posts/PostList';

type Params = Promise<{
  slug: string;
}>;

type Props = Readonly<{
  params: Params;
}>

export default async function TopicShowPage({ params }: Props) {

  const { slug } = await params;

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">
          {slug}
        </h1>
        <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
      </div>
      <div>
        <PostCreateFormPopover slug={slug}/>
      </div>
    </div>
  );
}
