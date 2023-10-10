import { Router, Request, Response } from 'express';
// import middlewareToken from '../middlewares/token.middleware';
import MatchesController from '../controllers/matches.controller';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req:Request, res: Response) => matchesController.getAll(req, res),
);

export default router;
