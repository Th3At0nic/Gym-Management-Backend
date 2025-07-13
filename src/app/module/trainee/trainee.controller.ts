/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { traineeService } from './trainee.service';
import { JwtPayload } from 'jsonwebtoken';

const traineeBookClassSchedule = catchAsync(async (req, res, next) => {
  const { classId } = req.params;
  const { userEmail } = req.user as JwtPayload;

  const result = await traineeService.traineeBookClassScheduleIntoDB(
    userEmail,
    classId,
  );

  const message = 'You Booked the class Successfully';
  sendResponse(res, StatusCodes.OK, true, message, result);
});

const cancelBookingByTrainee = catchAsync(async (req, res, next) => {
  const { classId } = req.params;
  const { userEmail } = req.user as JwtPayload;

  const result = await traineeService.cancelBookingByTraineeIntoDB(
    userEmail,
    classId,
  );

  const message = 'You have successfully cancelled your class booking.';
  sendResponse(res, StatusCodes.OK, true, message, result);
});

const getMyBookedClasses = catchAsync(async (req, res, next) => {
  const { userEmail } = req.user as JwtPayload;

  const result = await traineeService.getMyBookedClassesFromDB(userEmail);

  const message = 'Your booked classes retrieved successfully.';
  sendResponse(res, StatusCodes.OK, true, message, result);
});

export const traineeController = {
  traineeBookClassSchedule,
  cancelBookingByTrainee,
  getMyBookedClasses,
};
