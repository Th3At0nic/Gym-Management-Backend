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

export const traineeRoutes = router;
