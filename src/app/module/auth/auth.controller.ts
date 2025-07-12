/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

//imported HOF(catchAsync()) to pass the async func there to handle the promise and error, reduced boilerplates

const registerUser = catchAsync(async (req, res, next) => {
  const result = await authServices.registerUserIntoDB(req.body);
  const message = 'Registered Successfully!';
  sendResponse(res, StatusCodes.OK, true, message, result);
});

export const authControllers = { registerUser };
