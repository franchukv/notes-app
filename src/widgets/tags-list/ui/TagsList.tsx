import { motion, AnimatePresence } from 'motion/react';
import { SkeletonTagButton, TagButton, type Tag } from '@/entities/tag';
import { Notice } from '@/shared/ui';
import { itemVariants, listVariants } from '@/shared/lib/animations';

interface TagsListProps {
  title: string;
  tags: Tag[];
  isLoading: boolean;
}

export const TagsList = ({ title, tags, isLoading }: TagsListProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 lg:gap-2 lg:pt-4">
      <h2 className="max-lg:text-preset-1 lg:px-2 lg:text-preset-4 lg:text-neutral-500">
        {title}
      </h2>

      <div className="w-full h-full flex flex-col lg:gap-1 overflow-auto lg:max-h-[calc(100dvh-219px)] lg:min-h-60">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeletons"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SkeletonTagButton key={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : tags && tags.length > 0 ? (
            <motion.div
              key="items"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {tags.map((tag) => (
                <motion.div key={tag.id} variants={itemVariants}>
                  <TagButton url={`/tags/${tag.slug}`}>{tag.name}</TagButton>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <Notice key="notice">There are no tags yet.</Notice>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
