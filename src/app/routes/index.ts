import { Router } from 'express';
import { authRoutes } from '../module/auth/auth.route';
import { userRoutes } from '../module/user/user.route';
import { adminRoutes } from '../module/admin/admin.route';
import { trainerRoutes } from '../module/trainer/trainer.route';
import { traineeRoutes } from '../module/trainee/trainee.route';
import { classScheduleRoutes } from '../module/classSchedule/classSchedule.route';

const router = Router();

const routeModules = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
  {
    path: '/trainer',
    route: trainerRoutes,
  },
  {
    path: '/trainee',
    route: traineeRoutes,
  },
  {
    path: '/class-schedules', //this is for public class schedules to see which class is available to book but to book it user must be logged in as a trainee
    route: classScheduleRoutes,
  },
];

routeModules.forEach((route) => router.use(route.path, route.route));

export default router;
