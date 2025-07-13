import { Router } from 'express';
import { classScheduleController } from './classSchedule.controller';

const router = Router();

router.get('/', classScheduleController.getAllClassSchedules);

export const classScheduleRoutes = router;
