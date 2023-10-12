import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async getLeaderboard(req: Request, res: Response) {
    const { data } = await this.leaderboardService.getLeaderboard();
    return res.status(200).json(data);
  }
}
