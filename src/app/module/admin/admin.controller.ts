/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminService } from './admin.service';

const createTrainer = catchAsync(async (req, res, next) => {
  const result = await adminService.createTrainerIntoDB(req.body);

  const message = 'Trainer is Created Successfully';
  sendResponse(res, StatusCodes.CREATED, true, message, result);
});

const assignTrainerToClass = catchAsync(async (req, res, next) => {
  const { classScheduleId } = req.params;
  const { trainerId } = req.body;

  const result = await adminService.assignTrainerToClassIntoDB(
    classScheduleId,
    trainerId,
  );

  const message = 'Trainer Assigned Successfully';
  sendResponse(res, StatusCodes.OK, true, message, result);
});

export const adminController = { createTrainer, assignTrainerToClass };
