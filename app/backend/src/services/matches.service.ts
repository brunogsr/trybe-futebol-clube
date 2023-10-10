import { ServiceResponse } from '../Interfaces/ITeamService';
import { IMatches } from '../Interfaces/IMatchesModel';
import MatchesModel from '../models/matches.model';
// import TeamModel from '../models/team.model';

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
}
