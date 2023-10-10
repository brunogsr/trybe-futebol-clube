import { ServiceResponse } from '../Interfaces/ITeamService';
import { IMatches } from '../Interfaces/IMatchesModel';
import MatchesModel from '../models/matches.model';

export default class MatchesService {
  constructor(private matchesModel = new MatchesModel()) {}

  public async getAll(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getAllInProgress(inProgress: boolean): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async updateInProgress(id: number):
  Promise<ServiceResponse<object | null>> {
    const match = await this.matchesModel.updateInProgress(id);
    return { status: 'SUCCESSFUL', data: match };
  }
}
