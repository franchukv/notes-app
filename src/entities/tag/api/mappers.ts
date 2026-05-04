import type { Tag, TagDTO } from '../model/types';

export const mapTag = (dto: TagDTO): Tag => ({
  userId: dto.user_id,
  id: dto.id,
  slug: dto.slug,
  name: dto.name,
});

export const mapTagToDTO = (tag: Tag): TagDTO => ({
  user_id: tag.userId,
  id: tag.id,
  slug: tag.slug,
  name: tag.name,
});
