import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z.string().min(1, { message: 'Please enter the title' }),
  tags: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  content: z.string().optional(),
});
