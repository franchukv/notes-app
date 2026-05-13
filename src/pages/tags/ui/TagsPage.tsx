import { Navigate, Outlet, useParams } from 'react-router';
import { TagsList } from '@/widgets/tags-list';
import { useGetTagsQuery } from '@/entities/tag';
import { useAppSelector } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';

export const TagsPage = () => {
  const { tagSlug } = useParams();

  const isDesktop = useAppSelector(selectIsDesktop);

  const { data: tags, isLoading } = useGetTagsQuery();

  if (isDesktop && !tagSlug) {
    return <Navigate to="/notes" replace />;
  }

  return (
    <>
      {!isDesktop && !tagSlug ? (
        <div className="py-5">
          <div className="custom-container">
            <TagsList title="Tags" tags={tags ?? []} isLoading={isLoading} />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
