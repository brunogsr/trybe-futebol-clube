import { Router, Request, Response } from 'express';
import validateMatches from '../middlewares/matches.middleware';
import middlewareToken from '../middlewares/token.middleware';
import MatchesController from '../controllers/matches.controller';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req:Request, res: Response) => matchesController.getAll(req, res),
);

router.patch(
  '/:id/finish',
  middlewareToken.validateToken,
  (req: Request, res: Response) => matchesController.updateFinishProgress(req, res),
);

router.patch(
  '/:id',
  middlewareToken.validateToken,
  (req: Request, res: Response) => matchesController.updateInProgress(req, res),
);

router.post(
  '/',
  middlewareToken.validateToken,
  validateMatches,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
