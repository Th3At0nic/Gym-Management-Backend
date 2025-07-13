import { Router } from 'express';
import { auth } from '../../middlewares/authRequest';
import { USER_ROLE } from '../user/user.constant';
import { validateRequest } from '../../middlewares/validateRequest';
import { userRegisterValidationSchema } from '../auth/auth.validation';
import { adminController } from './admin.controller';

const router = Router();

router.post(
  '/create-trainer',
  auth(USER_ROLE.admin),
  validateRequest(userRegisterValidationSchema),
  adminController.createTrainer,
);

export const adminRoutes = router;
