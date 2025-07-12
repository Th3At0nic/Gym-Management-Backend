import { Router } from 'express';
import { authRoutes } from '../module/auth/auth.route';

const router = Router();

const routeModules = [
  {
    path: '/auth',
    route: authRoutes,
  },
];

routeModules.forEach((route) => router.use(route.path, route.route));

export default router;
