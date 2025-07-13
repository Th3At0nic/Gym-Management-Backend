/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { userService } from './user.service';
import { JwtPayload } from 'jsonwebtoken';
import sendResponse from '../../utils/sendResponse';

const updateOwnProfile = catchAsync(async (req, res, next) => {
  const { userEmail } = req.user as JwtPayload;
  const file = req?.file as Express.Multer.File;

  const result = await userService.updateOwnProfileIntoDB(
    userEmail,
    file,
    req.body,
  );
  const message = 'Updated Your Profile Successfully!';
  sendResponse(res, StatusCodes.OK, true, message, result);
});

export const userController = {
  updateOwnProfile,
};
