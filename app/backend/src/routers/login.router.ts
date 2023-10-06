import { Router, Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import validateLogin from '../middlewares/login.middleware';

const userController = new UserController();

const router = Router();

router.post('/', validateLogin, (_req:Request, res: Response) => userController.login(_req, res));

export default router;
