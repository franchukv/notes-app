import { Skeleton } from '@/shared/ui';

export const SkeletonNoteItem = () => {
  return (
    <div className="w-full p-2 my-0.5 flex flex-col gap-3 first:pt-2 last:pb-2 relative not-first:before:content-[] not-first:before:absolute not-first:before:left-0 not-first:before:-top-0.5 not-first:before:w-full not-first:before:h-px not-first:before:border-b not-first:before:border-neutral-200 dark:not-first:before:border-neutral-800">
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
};
