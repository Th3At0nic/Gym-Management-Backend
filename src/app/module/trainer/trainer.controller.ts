/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import { trainerService } from './trainer.service';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';

const getTrainerClassSchedulesFromDB = catchAsync(async (req, res, next) => {
  const { userEmail } = req.user as JwtPayload;
  const result = await trainerService.getTrainerClassSchedulesFromDB(userEmail);

  const message = 'Your class schedules retrieved successfully';
  sendResponse(res, StatusCodes.OK, true, message, result);
});

export const trainerController = {
  getTrainerClassSchedulesFromDB,
};
