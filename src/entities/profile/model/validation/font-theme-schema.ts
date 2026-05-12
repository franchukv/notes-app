import { z } from 'zod';

export const fontThemeSchema = z.object({
  theme: z.enum(['sans-serif', 'serif', 'monospace']),
});
