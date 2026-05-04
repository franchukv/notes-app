import type { Tag, TagDTO } from '../@x/tag';

export type NoteDTO = {
  user_id: string;
  id: number;
  updated_at: string;
  slug: string;
  title: string;
  note_tags: { tags: TagDTO }[];
  content: string;
  is_archived: boolean;
};

export type Note = {
  userId: string;
  id: number;
  updatedAt: string;
  slug: string;
  title: string;
  tags: Tag[];
  content: string;
  isArchived: boolean;
};
