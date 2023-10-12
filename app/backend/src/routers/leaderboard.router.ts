import { Router, Request, Response } from 'express';
import LeaderbordController from '../controllers/leaderboard.controller';

const leaderbordController = new LeaderbordController();

const router = Router();

router.get('/home', (req:Request, res: Response) =>
  leaderbordController.getLeaderboard(req, res));

export default router;
