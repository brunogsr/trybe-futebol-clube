import { Router, Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import middlewareLogin from '../middlewares/login.middleware';
import middlewareToken from '../middlewares/token.middleware';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  middlewareLogin.validateLogin,
  (_req:Request, res: Response) => userController.login(_req, res),
);

router.get(
  '/role',
  middlewareToken.validateToken,
  (_req:Request, res: Response) => userController.getRole(_req, res),
);

export default router;
