import { StatusCodes } from 'http-status-codes';
import throwAppError from '../../utils/throwAppError';
import { TClassSchedule } from './classSchedule.interface';
import { ClassScheduleModel } from './classSchedule.model';
import dayjs from 'dayjs';
import { UserModel } from '../user/user.model';

const createClassScheduleIntoDB = async (
  adminEmail: string,
  payload: Pick<TClassSchedule, 'date' | 'startTime' | 'trainer'>,
) => {
  const { date, startTime, trainer } = payload;

  //retrieving the classes in the day
  const schedulesForDay = await ClassScheduleModel.find({ date });

  //checking if total class is not more than 5 each day
  if (schedulesForDay.length >= 5) {
    throwAppError(
      'schedule',
      'Cannot Schedule more than 5 classes per day',
      StatusCodes.BAD_REQUEST,
    );
  }

  // Calculate fixed endTime (2 hours later)
  const start = dayjs(`${date} ${startTime}`);
  const endTime = start.add(2, 'hour').format('HH:mm');

  // Check if any schedule overlaps with this time
  const hasTimeConflict = schedulesForDay.some((schedule) => {
    // const existingStart = dayjs(`${date} ${schedule.startTime}`);

    const existingEnd = dayjs(`${date} ${schedule.endTime}`);

    return (
      start.isBefore(existingEnd) && endTime > schedule.startTime // prevent string based false pass
    );
  });

  if (hasTimeConflict) {
    throwAppError(
      'schedule',
      'This time slot is already occupied. Choose a different time.',
      StatusCodes.CONFLICT,
    );
  }

  //check if the trainer exists or not
  const isTrainerExist = await UserModel.findById(trainer);

  if (!isTrainerExist) {
    throwAppError(
      'trainer',
      'Trainer not found. Please reselect a valid trainer.',
      StatusCodes.NOT_FOUND,
    );
  }

  // Check if trainer already has a class in this time
  const trainerConflict = await ClassScheduleModel.findOne({
    date,
    trainer,
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
      },
    ],
  });

  if (trainerConflict) {
    throwAppError(
      'trainer',
      'Trainer is already assigned to another class in this time slot.',
      StatusCodes.CONFLICT,
    );
  }

  //find the admin with his email and get his mongodb id to assign createdBy
  const admin = await UserModel.findOne({
    email: adminEmail,
    role: 'admin',
  });

  if (!admin) {
    throwAppError(
      'admin',
      "Unfortunately Couldn't verify the admin to attempt this operation. Try again",
      StatusCodes.BAD_REQUEST,
    );
  }

  // Create schedule with endTime
  const result = await ClassScheduleModel.create({
    date,
    startTime,
    endTime,
    trainer,
    createdBy: admin?._id, // Replace this with admin's ID if available from token
  });

  if (!result) {
    throwAppError(
      '',
      "Couldn't create class schedule. Something went wrong, try again.",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  return result;
};

const getAllClassSchedulesFromDB = async () => {
  const schedules = await ClassScheduleModel.find({})
    .populate({
      path: 'trainer',
      select: 'name specialization profilePhotoURL', // only safe trainer fields
    })
    .sort({ date: 1, startTime: 1 });

  if (!schedules.length) {
    throwAppError(
      'schedules',
      'No Scheduled class found at this moment.',
      StatusCodes.NOT_FOUND,
    );
  }

  // Format and sanitize response
  const formattedSchedules = schedules.map((schedule) => ({
    _id: schedule._id,
    date: schedule.date,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    trainer: schedule.trainer,
    availableSlots: 10 - schedule.trainees.length,
  }));

  return formattedSchedules;
};

export const classScheduleService = {
  createClassScheduleIntoDB,
  getAllClassSchedulesFromDB,
};
