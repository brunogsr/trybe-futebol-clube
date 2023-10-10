import { ServiceResponse } from '../Interfaces/ITeamService';
import { IMatches } from '../Interfaces/IMatchesModel';
import MatchesModel from '../models/matches.model';
// import TeamModel from '../models/team.model';

export default class MatchesService {
  constructor(private matchesModel = new MatchesModel()) {}

  public async getAll(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();

    // console.log(allMatches);

    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
