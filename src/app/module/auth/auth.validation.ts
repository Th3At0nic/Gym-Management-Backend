import { z } from 'zod';

// Define Zod validation schema
export const userRegisterValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .max(100, { message: 'Name must be 100 characters or fewer' })
      .trim(), // Trims leading and trailing whitespace
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters long' })
      .max(128, { message: 'Password must be 128 characters or fewer' }),
  }),
});

export const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({ message: 'A valid email address is required.' })
      .min(1, { message: 'Email is required.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
  }),
});

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required!' }),
  }),
});
