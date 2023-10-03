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
    const { data } = await this.teamService.getById(Number(id));
    res.status(200).json(data);
  }
}