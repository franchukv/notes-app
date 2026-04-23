import { Link } from 'react-router';
import { Tag } from '@/entities/tag';
import { NavigationButton, TagsList } from '@/shared/ui';
import Logo from '@/shared/assets/img/svg/logo.svg?react';
import HomeIcon from '@/shared/assets/icons/home-icon.svg?react';
import ArchiveIcon from '@/shared/assets/icons/archive-icon.svg?react';

export const Sidebar = () => {
  const tags = [
    { id: 1, slug: 'cooking-1', text: 'Cooking 1' },
    { id: 2, slug: 'cooking-2', text: 'Cooking 2' },
    { id: 3, slug: 'cooking-3', text: 'Cooking 3' },
    { id: 4, slug: 'cooking-4', text: 'Cooking 4' },
  ];

  return (
    <aside className="max-w-67.5 w-full min-h-dvh max-h-dvh py-3 px-4 flex flex-col border-r border-neutral-200 overflow-auto">
      <Link to="/notes" className="my-3">
        <Logo />
      </Link>

      <nav className="mt-4 pb-2 flex flex-col gap-1 border-b border-neutral-200">
        <NavigationButton to="/notes">
          <HomeIcon /> All Notes
        </NavigationButton>

        <NavigationButton to="/archived">
          <ArchiveIcon /> Archived Notes
        </NavigationButton>
      </nav>

      <TagsList title="Tags">
        {tags.map((tag) => (
          <Tag key={tag.id} to={`/tags/${tag.slug}`}>
            {tag.text}
          </Tag>
        ))}
      </TagsList>
    </aside>
  );
};
