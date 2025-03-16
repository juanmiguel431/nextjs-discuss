import { redirect } from 'next/navigation';
import path from '@/path';

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
    <div>{term}</div>
  );
}
