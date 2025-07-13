import { Router } from 'express';
import { auth } from '../../middlewares/authRequest';
import { USER_ROLE } from '../user/user.constant';
import { trainerController } from './trainer.controller';

const router = Router();

router.get(
  '/my-schedules',
  auth(USER_ROLE.trainer),
  trainerController.getTrainerClassSchedulesFromDB,
);

export const trainerRoutes = router;
