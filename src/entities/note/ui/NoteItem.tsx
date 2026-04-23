import type { Note } from '../model/types';
import { NavLink } from 'react-router';

interface NoteItemProps extends Note {
  url: string;
}

export const NoteItem = ({ url, title, tags, date }: NoteItemProps) => {
  return (
    <NavLink
      to={url}
      className="w-full py-3 flex flex-col gap-3 not-last:border-b not-last:border-neutral-200 first:pt-2 last:pb-2"
    >
      <h3 className="text-preset-3">{title}</h3>

      {tags}

      <span className="text-preset-6 text-neutral-700">{date}</span>
    </NavLink>
  );
};
