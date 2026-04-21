import { z } from 'zod';

export const authSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const authUpdatePasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
