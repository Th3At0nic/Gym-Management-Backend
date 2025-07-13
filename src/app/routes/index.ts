import { Router } from 'express';
import { authRoutes } from '../module/auth/auth.route';
import { userRoutes } from '../module/user/user.route';

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
];

routeModules.forEach((route) => router.use(route.path, route.route));

export default router;
