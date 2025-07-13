/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminService } from './admin.service';

const createTrainer = catchAsync(async (req, res, next) => {
  const result = await adminService.createAdminIntoDB(req.body);

  const message = 'Trainer is Created Successfully';
  sendResponse(res, StatusCodes.CREATED, true, message, result);
});

export const adminController = { createTrainer };
