import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router';
import { ActionBarWidget } from '@/widgets/action-bar';
import { CreateNoteForm } from '@/features/create-note';
import { useGetTagBySlugQuery } from '@/entities/tag';
import { useAppSelector } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';
import { Button } from '@/shared/ui';

export const CreateNotePage = () => {
  const navigate = useNavigate();
  const { tagSlug } = useParams();

  const isDesktop = useAppSelector(selectIsDesktop);

  const parentUrl = tagSlug ? `/tags/${tagSlug}` : '/notes';

  const { data: tag } = useGetTagBySlugQuery(
    { slug: tagSlug! },
    { skip: !tagSlug },
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full py-5 flex lg:border-r lg:border-neutral-200 lg:max-w-[calc(100%-(240px+180px))] xl:max-w-[calc(100%-(290px*2))] dark:lg:border-neutral-800"
    >
      <div className="custom-container">
        <div className="h-full flex flex-col gap-3 sm:gap-4">
          {!isDesktop && (
            <ActionBarWidget parentUrl={parentUrl}>
              <Button
                type="button"
                variant="secondary-link"
                onClick={() => navigate(parentUrl)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                form="create-note-form"
                variant="primary-link"
              >
                Save Note
              </Button>
            </ActionBarWidget>
          )}

          <CreateNoteForm
            tagSlug={tagSlug}
            defaultTag={tag}
            parentUrl={parentUrl}
          />
        </div>
      </div>
    </motion.div>
  );
};
