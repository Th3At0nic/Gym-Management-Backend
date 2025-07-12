import { UserModel } from './auth.model';
import { TUser } from './auth.interface';
import throwAppError from '../../utils/throwAppError';
import { StatusCodes } from 'http-status-codes';
import { USER_ROLE } from '../../constants/user.constant';

const registerUserIntoDB = async (payload: TUser) => {
  const user: TUser = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: USER_ROLE.trainee,
    //as only trainee can create and manage his profile and admin will be created manually,
    //and trainer will be created by admin, so keeping this field(role) fixed as trainee as public registration
  };

  //preventing duplicate creation of student
  const userExisted = await UserModel.isUserExists(user.email as string);

  if (userExisted) {
    throwAppError(
      'email',
      `${user.email} is already registered.`,
      StatusCodes.CONFLICT,
    );
  }

  //creating a new user
  const newUser = await UserModel.create(user);

  if (!newUser) {
    throwAppError(
      'user',
      'Failed to register. Please try again later.',
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  return newUser;
};

export const authServices = { registerUserIntoDB };
