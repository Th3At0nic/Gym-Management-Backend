import mongoose from 'mongoose';
import { z } from 'zod';

// A regex to validate time in HH:mm 24-hour format
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// A regex to validate date in YYYY-MM-DD format
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid MongoDB ObjectId',
  });

export const createClassScheduleValidationSchema = z.object({
  body: z.object({
    date: z.string().regex(dateRegex, 'Date must be in YYYY-MM-DD format'),

    startTime: z
      .string()
      .regex(timeRegex, 'Start time must be in HH:mm format'),

    trainer: objectIdSchema,
  }),
});

export const assignTrainerValidationSchema = z.object({
  body: z.object({
    trainerId: objectIdSchema,
  }),
});
