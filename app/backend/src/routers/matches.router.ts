import { Router, Request, Response } from 'express';
// import middlewareToken from '../middlewares/token.middleware';
import MatchesController from '../controllers/matches.controller';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (_req:Request, res: Response) => matchesController.getAll(_req, res),
);
// router.get('/:id', (req: Request, res: Response) => matchesController.getById(req, res));

export default router;
