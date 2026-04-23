import { Navigate, Outlet, useParams } from 'react-router';
import { Tag } from '@/entities/tag';
import { useAppSelector } from '@/shared/lib';
import { TagsList } from '@/shared/ui';
import { selectIsDesktop } from '@/shared/model';

export const TagsPage = () => {
  const { tagSlug } = useParams();
  const isDesktop = useAppSelector(selectIsDesktop);
  const tags = [
    { id: 1, slug: 'cooking-1', text: 'Cooking 1' },
    { id: 2, slug: 'cooking-2', text: 'Cooking 2' },
    { id: 3, slug: 'cooking-3', text: 'Cooking 3' },
    { id: 4, slug: 'cooking-4', text: 'Cooking 4' },
  ];

  if (isDesktop && !tagSlug) {
    return <Navigate to="/notes" replace />;
  }

  return (
    <section className="py-5">
      <div className="custom-container">
        {!isDesktop && !tagSlug ? (
          <TagsList title="Tags">
            {tags.map((tag) => (
              <Tag key={tag.id} to={`/tags/${tag.slug}`}>
                {tag.text}
              </Tag>
            ))}
          </TagsList>
        ) : (
          <Outlet />
        )}
      </div>
    </section>
  );
};
