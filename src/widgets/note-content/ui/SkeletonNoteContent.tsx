import { motion } from 'motion/react';
import { Skeleton } from '@/shared/ui';

interface SkeletonNoteContentProps {
  isArchivedNote: boolean;
}

export const SkeletonNoteContent = ({
  isArchivedNote,
}: SkeletonNoteContentProps) => {
  return (
    <motion.div
      key="skeleton"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col gap-3 sm:gap-4"
    >
      <Skeleton className="min-h-8 h-8 w-1/2" />

      <div className="pb-3 flex flex-col gap-2 border-b border-neutral-200 sm:pb-4 dark:border-neutral-800">
        <Skeleton className="h-5 w-1/4 sm:h-6" />

        {isArchivedNote && <Skeleton className="h-5 w-1/6 sm:h-6" />}

        <Skeleton className="h-5 w-1/5 sm:h-6" />
      </div>

      <Skeleton className="h-full w-full" />
    </motion.div>
  );
};
