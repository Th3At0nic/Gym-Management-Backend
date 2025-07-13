import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import throwAppError from '../../utils/throwAppError';
import { StatusCodes } from 'http-status-codes';
import { USER_ROLE } from '../user/user.constant';
import { generateToken } from './auth.utils';
import config from '../../config';
import { TUser } from '../user/user.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';

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

const loginUserAuth = async (payload: TLoginUser) => {
  const { email, password: userGivenPassword } = payload;

  const user = await UserModel.isUserExists(email);

  if (!user) {
    throwAppError(
      'email',
      `This Email is not Registered. Please Register first`,
      StatusCodes.UNAUTHORIZED,
    );
  }

  const isPasswordValid = await UserModel.isPasswordCorrect(
    userGivenPassword,
    user?.password as string,
  );

  if (!isPasswordValid) {
    throwAppError(
      'password',
      'The provided password is incorrect. Please try again.',
      StatusCodes.UNAUTHORIZED,
    );
  }

  const jwtPayload = {
    userEmail: user?.email as string,
    role: user?.role as string,
  };

  // create access token and send it to the client
  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const createNewAccessTokenByRefreshToken = async (token: string) => {
  if (!token) {
    throwAppError(
      'authorization',
      'Authorization is required to access this resource.',
      StatusCodes.UNAUTHORIZED,
    );
  }

  // check if the token is valid
  // invalid token
  const decoded = jwt.verify(token, config.jwt_refresh_secret as string);

  // decoded undefined
  const { userEmail, role } = decoded as JwtPayload;

  // req.user = decoded as JwtPayload;

  const user = await UserModel.isUserExists(userEmail);

  if (!user) {
    throwAppError(
      'email',
      `The ${role} with the email: ${userEmail} not found in the system. Please recheck the Email and try again`,
      StatusCodes.NOT_FOUND,
    );
  }

  if (user) {
    const jwtPayload = {
      userEmail: user.email,
      role: user.role,
    };

    //create access token and send it to the client
    const accessToken = generateToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
    return { accessToken };
  } else return null;
};

export const authServices = {
  registerUserIntoDB,
  loginUserAuth,
  createNewAccessTokenByRefreshToken,
};
