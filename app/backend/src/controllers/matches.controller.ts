import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getAll(_req: Request, res: Response) {
    const { data } = await this.matchesService.getAll();
    return res.status(200).json(data);
  }

  // public async getById(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const { status, data } = await this.matchesService.getById(Number(id));
  //   if (status === 'NOT_FOUND') return res.status(404).json(data);
  //   return res.status(200).json(data);
  // }
}
