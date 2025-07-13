import { Router } from 'express';
import { USER_ROLE } from '../user/user.constant';
import { auth } from '../../middlewares/authRequest';
import { traineeController } from './trainee.controller';

const router = Router();

router.post(
  '/book-class/:classId',
  auth(USER_ROLE.trainee),
  traineeController.traineeBookClassSchedule,
);

router.delete(
  '/cancel-class/:classId',
  auth(USER_ROLE.trainee),
  traineeController.cancelBookingByTrainee,
);

export const traineeRoutes = router;
