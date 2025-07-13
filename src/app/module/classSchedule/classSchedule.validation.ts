import { z } from 'zod';

// A regex to validate time in HH:mm 24-hour format
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// A regex to validate date in YYYY-MM-DD format
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const createClassScheduleValidationSchema = z.object({
  body: z.object({
    date: z.string().regex(dateRegex, 'Date must be in YYYY-MM-DD format'),

    startTime: z
      .string()
      .regex(timeRegex, 'Start time must be in HH:mm format'),

    trainer: z
      .string({ required_error: 'Trainer ID is required' })
      .min(1, 'Trainer ID cannot be empty'),
  }),
});
