import TopicCreateFormPopover from '@/components/topics/TopicCreateFormPopover';
import TopicList from '@/components/topics/TopicList';
import { Divider } from '@heroui/divider';
import { Suspense } from 'react';
import { Spinner } from '@heroui/spinner';
import PostList from '@/components/posts/PostList';
import { fetchTopPosts } from '@/db/queries/post';

export default function Home() {

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Post</h1>
        <PostList fetchData={fetchTopPosts}/>
      </div>
      <div className="border shadow py-3 px-2">
        <TopicCreateFormPopover/>

        <Divider className="my-2"/>

        <h3 className="text-lg">Topics</h3>
        <Suspense fallback={<Spinner className="flex items-center"/>}>
          <TopicList/>
        </Suspense>
      </div>
    </div>
  );
}
