import { ClassScheduleModel } from '../classSchedule/classSchedule.model';
import throwAppError from '../../utils/throwAppError';
import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../user/user.model';

export const getTrainerClassSchedulesFromDB = async (trainerEmail: string) => {
  const trainer = await UserModel.findOne({ email: trainerEmail });

  if (!trainer) {
    throwAppError(
      'trainer',
      "Couldn't retrieve your data,try again",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  const schedules = await ClassScheduleModel.find({
    trainer: trainer?._id,
  }).sort({
    date: 1,
    startTime: 1,
  });

  if (!schedules.length) {
    throwAppError(
      'classSchedules',
      "You don't have any class schedules",
      StatusCodes.NOT_FOUND,
    );
  }

  return schedules;
};

export const trainerService = {
  getTrainerClassSchedulesFromDB,
};
