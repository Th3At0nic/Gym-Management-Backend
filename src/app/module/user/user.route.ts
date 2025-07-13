import { NextFunction, Request, Response, Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { updateUserProfileValidationSchema } from './user.validation';
import { userController } from './user.controller';
import { USER_ROLE } from './user.constant';
import { upload } from '../../utils/sendImageToCloudinary';
import { auth } from '../../middlewares/authRequest';

const router = Router();

router.post(
  '/update-profile',
  auth(USER_ROLE.admin, USER_ROLE.trainee, USER_ROLE.trainer),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(updateUserProfileValidationSchema),
  userController.updateOwnProfile,
);

export const userRoutes = router;
