import { Router, Request, Response } from 'express';
import UserController from '../controllers/user.controller';

const userController = new UserController();

const router = Router();

router.post('/', (_req:Request, res: Response) => userController.login(_req, res));

export default router;
