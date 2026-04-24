import { Outlet, useParams } from 'react-router';
import { NotesList } from '@/widgets/notes-list';
import { useAppSelector, usePageTitle } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';

export const TagPage = () => {
  const isDesktop = useAppSelector(selectIsDesktop);
  const { tagSlug, noteSlug } = useParams();
  const notes = [
    {
      id: 1,
      slug: 'note-1',
      title: 'React Performance Optimization',
      tags: [
        { id: 1, slug: 'cooking-1', text: 'Cooking 1' },
        { id: 2, slug: 'cooking-2', text: 'Cooking 2' },
      ],
      date: '29 Oct 2026',
    },
    {
      id: 2,
      slug: 'note-2',
      title: 'Japan Travel Planning',
      tags: null,
      date: '28 Oct 2026',
    },
    {
      id: 3,
      slug: 'note-3',
      title: 'Favorite Pasta Recipes',
      tags: null,
      date: '27 Oct 2026',
    },
    {
      id: 4,
      slug: 'note-4',
      title: 'Meal Prep Ideas',
      tags: null,
      date: '12 Oct 2026',
    },
  ];

  usePageTitle(tagSlug);

  return (
    <div className="min-h-full w-full flex overflow-auto">
      {(isDesktop || !noteSlug) && (
        <NotesList parentUrl={`/tags/${tagSlug}`} notes={notes}>
          {!isDesktop && (
            <div className="flex flex-col gap-4">
              <h1>
                Notes Tagged: <b>{tagSlug}</b>
              </h1>

              <p>All notes with the "{tagSlug}" tag are shown here.</p>
            </div>
          )}
        </NotesList>
      )}

      {(isDesktop || noteSlug) && <Outlet />}
    </div>
  );
};
