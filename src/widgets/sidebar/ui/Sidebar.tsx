import { Link } from 'react-router';
import { TagButton, useGetTagsQuery } from '@/entities/tag';
import { NavigationButton, Notice, TagsList } from '@/shared/ui';
import Logo from '@/shared/assets/img/svg/logo.svg?react';
import HomeIcon from '@/shared/assets/icons/home-icon.svg?react';
import ArchiveIcon from '@/shared/assets/icons/archive-icon.svg?react';

export const Sidebar = () => {
  const { data: tags } = useGetTagsQuery();

  return (
    <aside className="w-full min-h-dvh max-h-dvh py-3 px-4 flex flex-col border-r border-neutral-200 overflow-auto lg:max-w-60 xl:max-w-67.5">
      <Link to="/notes" className="my-3">
        <Logo />
      </Link>

      <nav className="mt-4 pb-2 flex flex-col gap-1 border-b border-neutral-200">
        <NavigationButton to="/notes">
          <HomeIcon /> All Notes
        </NavigationButton>

        <NavigationButton to="/archived-notes">
          <ArchiveIcon /> Archived Notes
        </NavigationButton>
      </nav>

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
    </aside>
  );
};
