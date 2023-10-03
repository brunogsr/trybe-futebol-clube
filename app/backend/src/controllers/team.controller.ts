import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async getAll(_req: Request, res: Response) {
    const { data } = await this.teamService.getAll();
    res.status(200).json(data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamService.getById(Number(id));
    if (status === 'NOT_FOUND') return res.status(404).json(data);
    res.status(200).json(data);
  }
}
