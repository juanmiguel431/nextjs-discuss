import { redirect } from 'next/navigation';
import path from '@/path';
import PostList from '@/components/posts/PostList';
import { fetchPostBySearchTerm } from '@/db/queries/post';

type Props = Readonly<{
  searchParams: Promise<{
    term: string;
  }>
}>

export default async function SearchPage({ searchParams }: Props) {

  const { term } = await searchParams;

  if (!term) {
    redirect(path.home());
  }

  return (
    <div>
      <PostList
        fetchData={() => fetchPostBySearchTerm(term)}
      />
    </div>
  );
}
