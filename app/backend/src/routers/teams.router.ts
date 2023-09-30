import { Router, Request, Response } from 'express';
import TeamController from '../controllers/team.controller';

const teamController = new TeamController();

const router = Router();

router.get('/', (_req:Request, res: Response) => teamController.getAll(_req, res));
router.get('/:id', (req: Request, res: Response) => teamController.getById(req, res));

export default router;
