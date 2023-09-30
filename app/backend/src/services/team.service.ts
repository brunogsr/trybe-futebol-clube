import { ServiceResponse } from '../Interfaces/ITeamService';
import { ITeam } from '../Interfaces/ITeamModel';
import TeamModel from '../models/team.model';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) {}

  public async getAll(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'Time não encontrado' } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
