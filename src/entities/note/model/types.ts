import type { Tag } from '../@x/tag';

export type Note = {
  id: number;
  slug: string;
  title: string;
  tags: Tag[] | null;
  date: string;
};
