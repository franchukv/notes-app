import { z } from 'zod';

export const colorThemeSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
});
