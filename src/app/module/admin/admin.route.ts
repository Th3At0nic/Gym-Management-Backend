import { Router } from 'express';
import { auth } from '../../middlewares/authRequest';
import { USER_ROLE } from '../user/user.constant';
import { validateRequest } from '../../middlewares/validateRequest';
import { userRegisterValidationSchema } from '../auth/auth.validation';
import { adminController } from './admin.controller';
import {
  assignTrainerValidationSchema,
  createClassScheduleValidationSchema,
} from '../classSchedule/classSchedule.validation';
import { classScheduleController } from '../classSchedule/classSchedule.controller';

const router = Router();

router.post(
  '/create-trainer',
  auth(USER_ROLE.admin),
  validateRequest(userRegisterValidationSchema),
  adminController.createTrainer,
);

router.post(
  '/class-schedules',
  auth(USER_ROLE.admin),
  validateRequest(createClassScheduleValidationSchema),
  classScheduleController.createClassSchedule,
);

router.patch(
  '/class-schedules/:classScheduleId/assign-trainer',
  auth(USER_ROLE.admin),
  validateRequest(assignTrainerValidationSchema),
  adminController.assignTrainerToClass,
);

export const adminRoutes = router;
