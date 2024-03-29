import { ServiceResponse } from '../Interfaces/ITeamService';
import { IMatches } from '../Interfaces/IMatchesModel';
import MatchesModel from '../models/matches.model';
import TeamModel from '../models/team.model';

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

  public async updateFinishProgress(id: number):
  Promise<ServiceResponse<object | null>> {
    const match = await this.matchesModel.updateFinishProgress(id);
    return { status: 'SUCCESSFUL', data: match };
  }

  public async updateInProgress(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<object | null>> {
    const match = await this.matchesModel.updateInProgress(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: match };
  }

  public async createMatch(newMatch: IMatches): Promise<ServiceResponse<object | null>> {
    const teamModel = new TeamModel();
    const homeTeam = await teamModel.findById(newMatch.homeTeamId);
    const awayTeam = await teamModel.findById(newMatch.awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const match = await this.matchesModel.createMatch(newMatch);
    return { status: 'SUCCESSFUL', data: match };
  }
}
