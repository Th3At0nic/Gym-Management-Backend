import { Schema, model } from 'mongoose';
import { TClassSchedule } from './classSchedule.interface';

const classScheduleSchema = new Schema<TClassSchedule>(
  {
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    trainees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ClassScheduleModel = model<TClassSchedule>('ClassSchedule', classScheduleSchema);
