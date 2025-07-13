import { ClassScheduleModel } from '../classSchedule/classSchedule.model'; // adjust path
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import throwAppError from '../../utils/throwAppError';
import { UserModel } from '../user/user.model';

export const traineeBookClassScheduleIntoDB = async (
  userEmail: string,
  scheduleId: string,
) => {
  const schedule = await ClassScheduleModel.findById(scheduleId);

  if (!schedule) {
    throwAppError(
      'scheduleId',
      'Class schedule not found',
      StatusCodes.NOT_FOUND,
    );
    return;
  }

  //get the trainee data and id
  const trainee = await UserModel.findOne({ email: userEmail });

  if (!trainee) {
    throwAppError(
      '',
      'User lookup failed. Please try again later.',
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  // Prevent double booking
  if (schedule.trainees.includes(new Types.ObjectId(trainee?._id))) {
    throwAppError(
      'traineeId',
      'You have already booked this class',
      StatusCodes.CONFLICT,
    );
  }

  // Check if class is full
  if (schedule.trainees.length >= 10) {
    throwAppError(
      'schedule',
      'This class is already full. Can not Book.',
      StatusCodes.BAD_REQUEST,
    );
  }

  // Check time overlap: is trainee already booked for another class in this timeslot?
  const overlapping = await ClassScheduleModel.findOne({
    trainees: trainee?._id,
    date: schedule.date,
    $or: [
      {
        startTime: { $lt: schedule.endTime },
        endTime: { $gt: schedule.startTime },
      },
    ],
  });

  if (overlapping) {
    throwAppError(
      'schedule',
      'You are already booked in another class at this time.',
      StatusCodes.CONFLICT,
    );
  }

  // Book trainee
  schedule.trainees.push(new Types.ObjectId(trainee?._id));
  const result = await schedule.save();

  if (!result) {
    throwAppError(
      '',
      "Something went wrong, Couldn't Book!",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  return result;
};

export const traineeService = {
  traineeBookClassScheduleIntoDB,
};
