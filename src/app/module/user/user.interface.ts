/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  _id?: string;
  email: string;
  password: string;
  role: 'admin' | 'trainer' | 'trainee';

  // Common profile fields
  name: string;
  phone?: string;
  profilePhotoURL?: string;

  // Optional trainer-specific fields.. if the role is trainer, the backend and frontend both will allow user to update these fields, if its admin | trainee then prevented
  specialization?: string;
  bio?: string;

  // Optional trainee-specific fields..this can be modified by all user for their own profile
  age?: number;
  goals?: string;

  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUser extends Model<TUser> {
  isUserExists(email: string): Promise<TUser | null>;
  isPasswordCorrect(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
