/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import { classScheduleService } from './classSchedule.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createClassSchedule = catchAsync(async (req, res, next) => {
  const { userEmail } = req.user as JwtPayload;
  const result = await classScheduleService.createClassScheduleIntoDB(
    userEmail,
    req.body,
  );
  const message = 'Class scheduled successfully';
  sendResponse(res, StatusCodes.CREATED, true, message, result);
});

const getAllClassSchedules = catchAsync(async (req, res, next) => {
  const result = await classScheduleService.getAllClassSchedulesFromDB();

  const message = 'All Class scheduled retrieved successfully';
  sendResponse(res, StatusCodes.OK, true, message, result);
});

export const classScheduleController = {
  createClassSchedule,
  getAllClassSchedules,
};
