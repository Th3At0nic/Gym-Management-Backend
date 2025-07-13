import { Types } from 'mongoose';

export type TClassSchedule = {
  _id?: string;
  date: string; // Format: YYYY-MM-DD
  startTime: string; // Format: HH:mm
  endTime: string; // Format: HH:mm

  trainer: Types.ObjectId; // Reference to User (role: trainer)
  trainees: Types.ObjectId[]; // Array of User IDs (role: trainee)

  createdBy: Types.ObjectId; // Admin who created the schedule
  createdAt?: Date;
  updatedAt?: Date;
};
