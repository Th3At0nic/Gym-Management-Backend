import { Router } from 'express';

const router = Router();

// router.post(
//   '/class-schedules',
//   auth(USER_ROLE.admin),
//   validateRequest(createClassScheduleValidationSchema),
//   classScheduleController.createClassSchedule,
// );

export const classScheduleRoutes = router;
