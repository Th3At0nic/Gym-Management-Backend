import { Router } from 'express';
import { authRoutes } from '../module/auth/auth.route';
import { userRoutes } from '../module/user/user.route';
import { adminRoutes } from '../module/admin/admin.route';
import { trainerRoutes } from '../module/trainer/trainer.route';

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
];

routeModules.forEach((route) => router.use(route.path, route.route));

export default router;
