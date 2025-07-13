import { StatusCodes } from 'http-status-codes';
import throwAppError from '../../utils/throwAppError';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const updateOwnProfileIntoDB = async (
  userEmail: string,
  file: Express.Multer.File,
  payload: Partial<TUser>,
) => {
  const user = await UserModel.findOne({ email: userEmail });

  if (!user) {
    throwAppError(
      'email',
      `User with ${userEmail} not found`,
      StatusCodes.NOT_FOUND,
    );
  }

  // Prepare fields to update
  const updatePayload: Partial<TUser> = {};

  if (file) {
    const imgName = `${userEmail}-${Date.now()}`;
    const uploadImgResult = await sendImageToCloudinary(file.buffer, imgName);

    if (uploadImgResult?.secure_url) {
      updatePayload.profilePhotoURL = uploadImgResult.secure_url;
    } else {
      throwAppError(
        'profilePhoto',
        'Failed to upload profile photo, try again.',
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  if (payload.phone) updatePayload.phone = payload.phone;
  if (payload.specialization)
    updatePayload.specialization = payload.specialization;
  if (payload.bio) updatePayload.bio = payload.bio;
  if (payload.goals) updatePayload.goals = payload.goals;

  if (payload.age !== undefined) {
    if (payload.age <= 0) {
      throwAppError(
        'age',
        'Age cannot be negative or zero',
        StatusCodes.BAD_REQUEST,
      );
    }
    updatePayload.age = payload.age;
  }

  const updatedUser = await UserModel.findOneAndUpdate(
    { email: userEmail },
    { $set: updatePayload },
    { new: true }, // Return the updated document
  );

  return updatedUser;
};

export const userService = {
  updateOwnProfileIntoDB,
};
