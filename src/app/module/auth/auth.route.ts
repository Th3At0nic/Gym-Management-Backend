import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  loginUserValidationSchema,
  refreshTokenValidationSchema,
  userRegisterValidationSchema,
} from './auth.validation';
import { authControllers } from './auth.controller';
const router = express.Router();

router.post(
  '/register',
  validateRequest(userRegisterValidationSchema),
  authControllers.registerUser,
);

router.post(
  '/login',
  validateRequest(loginUserValidationSchema),
  authControllers.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(refreshTokenValidationSchema),
  authControllers.createNewAccessTokenByRefreshToken,
);

export const authRoutes = router;
