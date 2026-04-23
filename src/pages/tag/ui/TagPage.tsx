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
      tags: ['Dev', 'React'],
      date: '29 Oct 2026',
    },
    {
      id: 2,
      slug: 'note-2',
      title: 'Japan Travel Planning',
      tags: ['Travel', 'Personal'],
      date: '28 Oct 2026',
    },
    {
      id: 3,
      slug: 'note-3',
      title: 'Favorite Pasta Recipes',
      tags: ['Cooking', 'Recipes'],
      date: '27 Oct 2026',
    },
    {
      id: 4,
      slug: 'note-4',
      title: 'Meal Prep Ideas',
      tags: ['Cooking', 'Health', 'Recipes'],
      date: '12 Oct 2026',
    },
  ];

  usePageTitle(tagSlug);

  return (
    <div className="w-full flex">
      {(isDesktop || !noteSlug) && (
        <NotesList parentSlug={`tags/${tagSlug}`} notes={notes}>
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
