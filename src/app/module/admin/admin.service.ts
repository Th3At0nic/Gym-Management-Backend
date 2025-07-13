import { StatusCodes } from 'http-status-codes';
import throwAppError from '../../utils/throwAppError';
import { TUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import { USER_ROLE } from '../user/user.constant';

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

export const adminService = { createAdminIntoDB };
