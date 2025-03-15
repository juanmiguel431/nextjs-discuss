import { db } from '@/db';
import Link from 'next/link';
import paths from '@/path';
import { Chip } from '@heroui/chip';

export default async function TopicList() {

  await new Promise(r => setTimeout(r, 2000));
  const topics = await db.topic.findMany()

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {topics.map(topic => (
        <div key={topic.id}>
          <Link href={paths.topicShow(topic.slug)}>
            <Chip color="warning" variant="shadow">
              {topic.slug}
            </Chip>
          </Link>
        </div>
      ))}
    </div>
  );
}
