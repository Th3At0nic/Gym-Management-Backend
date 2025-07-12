import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { userRegisterValidationSchema } from './auth.validation';
import { authControllers } from './auth.controller';
const router = express.Router();

router.post(
  '/register',
  validateRequest(userRegisterValidationSchema),
  authControllers.registerUser,
);

export const authRoutes = router;
