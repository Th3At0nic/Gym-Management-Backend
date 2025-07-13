import { z } from 'zod';

export const updateUserProfileValidationSchema = z.object({
  body: z.object({
    phone: z.string().optional(),

    specialization: z.string().optional(),

    bio: z.string().optional(),

    age: z
      .number()
      .int()
      .positive({ message: 'Age must be a positive number' })
      .optional(),

    goals: z.string().optional(),
  }),
});
