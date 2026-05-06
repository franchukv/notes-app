import { Navigate, Outlet, useParams } from 'react-router';
import { TagButton, useGetTagsQuery } from '@/entities/tag';
import { useAppSelector } from '@/shared/lib';
import { Notice, TagsList } from '@/shared/ui';
import { selectIsDesktop } from '@/shared/model';

export const TagsPage = () => {
  const { tagSlug } = useParams();

  const isDesktop = useAppSelector(selectIsDesktop);

  const { data: tags } = useGetTagsQuery();

  if (isDesktop && !tagSlug) {
    return <Navigate to="/notes" replace />;
  }

  return (
    <>
      {!isDesktop && !tagSlug ? (
        <div className="py-5">
          <div className="custom-container">
            <TagsList title="Tags">
              {tags && tags.length > 0 ? (
                tags.map((tag) => (
                  <TagButton key={tag.id} url={`/tags/${tag.slug}`}>
                    {tag.name}
                  </TagButton>
                ))
              ) : (
                <Notice>There are no tags yet.</Notice>
              )}
            </TagsList>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
