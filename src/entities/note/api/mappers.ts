import type { Note, NoteDTO } from '../model/types';
import { mapTag, mapTagToDTO } from '../@x/tag';

export const mapNote = (dto: NoteDTO): Note => ({
  userId: dto.user_id,
  id: dto.id,
  updatedAt: dto.updated_at,
  slug: dto.slug,
  title: dto.title,
  tags:
    dto.note_tags?.flatMap((nt) => (nt.tags ? [mapTag(nt.tags)] : [])) ?? [],
  content: dto.content,
  isArchived: dto.is_archived,
});

export const mapNoteToDTO = (note: Note): NoteDTO => ({
  user_id: note.userId,
  id: note.id,
  updated_at: note.updatedAt,
  slug: note.slug,
  title: note.title,
  note_tags: note.tags.map((tag) => ({
    tags: mapTagToDTO(tag),
  })),
  content: note.content,
  is_archived: note.isArchived,
});
