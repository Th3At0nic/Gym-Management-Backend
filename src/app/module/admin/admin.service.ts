import { StatusCodes } from 'http-status-codes';
import throwAppError from '../../utils/throwAppError';
import { TUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import { USER_ROLE } from '../user/user.constant';
import { ClassScheduleModel } from '../classSchedule/classSchedule.model';
import { Types } from 'mongoose';

const createAdminIntoDB = async (
  payload: Pick<TUser, 'email' | 'name' | 'password'>,
) => {
  const isUserExists = await UserModel.isUserExists(payload.email);

  if (isUserExists) {
    throwAppError(
      'email',
      `An user is already registered with this email: ${payload.email}`,
      StatusCodes.CONFLICT,
    );
  }

  const trainerData = {
    ...payload,
    role: USER_ROLE.trainer,
  };

  const result = await UserModel.create(trainerData);

  if (!result) {
    throwAppError(
      '',
      "Couldn't create the trainer. Something went wrong, try again.",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  return result;
};

const assignTrainerToClassIntoDB = async (
  classScheduleId: string,
  trainerId: string,
) => {
  const schedule = await ClassScheduleModel.findById(classScheduleId);

  if (!schedule) {
    throwAppError(
      'classScheduleId',
      'Class schedule not found. Select valid class schedule',
      StatusCodes.NOT_FOUND,
    );
    return;
  }

  //check if the trainer is exists or not
  const isTrainerExists = await UserModel.findById(trainerId);
  if (!isTrainerExists) {
    throwAppError(
      'trainerId',
      'Trainer not found. Select valid trainer.',
      StatusCodes.BAD_REQUEST,
    );
  }

  // Optional: Check if trainer is available for the class time (no overlap)
  const overlappingTrainerTime = await ClassScheduleModel.findOne({
    date: schedule.date,
    trainer: trainerId,
    _id: { $ne: classScheduleId }, // exclude current schedule
    $or: [
      {
        startTime: { $lt: schedule.endTime },
        endTime: { $gt: schedule.startTime },
      },
    ],
  });

  if (overlappingTrainerTime) {
    throwAppError(
      'trainerId',
      'Trainer is already assigned to another class in this time slot.',
      StatusCodes.CONFLICT,
    );
  }

  //assigning the trainer to the class
  schedule.trainer = new Types.ObjectId(trainerId);

  //saving it to the database
  const updatedSchedule = await schedule.save();

  if (!updatedSchedule) {
    throwAppError(
      '',
      "Couldn't update the class schedule. Something went wrong.",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  return updatedSchedule;
};

export const adminService = { createAdminIntoDB, assignTrainerToClassIntoDB };
