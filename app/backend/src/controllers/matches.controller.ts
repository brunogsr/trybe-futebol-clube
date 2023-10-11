import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const inProgressBoolean = JSON.parse(inProgress as string); // JSON.parse(inProgress) para transformar String em Boolean
      const { data } = await this.matchesService.getAllInProgress(inProgressBoolean);
      return res.status(200).json(data);
    }
    const { data } = await this.matchesService.getAll();
    return res.status(200).json(data);
  }

  public async updateFinishProgress(req: Request, res: Response) {
    const { id } = req.params;
    const { data } = await this.matchesService.updateFinishProgress(Number(id));
    return res.status(200).json(data);
  }

  public async updateInProgress(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { data } = await this.matchesService.updateInProgress(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );
    return res.status(200).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { body } = req;
    const { status, data } = await this.matchesService.createMatch({ ...body, inProgress: true });
    if (status === 'NOT_FOUND') return res.status(404).json(data);
    return res.status(201).json(data);
  }
}
