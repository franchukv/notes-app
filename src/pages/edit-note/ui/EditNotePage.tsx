import { useNavigate, useParams } from 'react-router';
import { ActionBarWidget } from '@/widgets/action-bar';
import { EditNoteForm } from '@/features/edit-note';
import { useGetNoteBySlugQuery } from '@/entities/note';
import { useAppSelector } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';
import { Button } from '@/shared/ui';

export const EditNotePage = () => {
  const navigate = useNavigate();
  const { tagSlug, noteSlug } = useParams();

  const isDesktop = useAppSelector(selectIsDesktop);

  const parentUrl = tagSlug ? `/tags/${tagSlug}` : '/notes';

  const { data: note, isSuccess } = useGetNoteBySlugQuery({
    slug: noteSlug!,
  });

  return (
    <div className="w-full py-5 flex lg:border-r lg:border-neutral-200 lg:max-w-[calc(100%-(240px+180px))] xl:max-w-[calc(100%-(290px*2))]">
      <div className="custom-container">
        <div className="h-full flex flex-col gap-3 sm:gap-4">
          {!isDesktop && (
            <ActionBarWidget parentUrl={parentUrl}>
              {isSuccess && (
                <>
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
                </>
              )}
            </ActionBarWidget>
          )}

          {isSuccess && <EditNoteForm note={note} parentUrl={parentUrl} />}
        </div>
      </div>
    </div>
  );
};
