import { NavLink } from 'react-router';
import type { Note } from '../model/types';
import { TagItem } from '../@x/tag';

interface NoteItemProps extends Note {
  url: string;
}

export const NoteItem = ({ url, title, tags, date }: NoteItemProps) => {
  return (
    <NavLink
      to={url}
      className="w-full p-2 my-0.5 flex flex-col gap-3 relative  first:pt-2 last:pb-2 rounded-md transition-bg duration-300 hover:bg-neutral-100 active:bg-neutral-100 not-first:before:content-[] not-first:before:absolute not-first:before:left-0 not-first:before:-top-0.5 not-first:before:w-full not-first:before:h-px not-first:before:border-b not-first:before:border-neutral-200 not-first:before:transition-all not-first:before:duration-300 not-first:hover:before:border-transparent not-first:active:before:border-transparent [&:hover+*]:before:border-transparent [&:active+*]:before:border-transparent"
    >
      <h3 className="text-preset-3">{title}</h3>

      {tags && tags?.length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          {tags.map((tag) => (
            <TagItem key={tag.id}>{tag.text}</TagItem>
          ))}
        </div>
      )}

      <span className="text-preset-6 text-neutral-700">{date}</span>
    </NavLink>
  );
};
