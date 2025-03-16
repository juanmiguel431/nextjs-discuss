import React from 'react';
import { Skeleton } from '@heroui/skeleton';

export default function PostShowLoading() {
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">
        <Skeleton className="h-8 w-48"/>
      </h1>
      <div className="p-4 border rounded space-y-2">
        <Skeleton className="h-6 w-32"/>
      </div>
    </div>
  );
}
