import { ModelStatic } from 'sequelize';
import { ITeam, ITeamModel } from '../Interfaces/ITeamModel';
import Team from '../database/models/team.model';

export default class TeamModel implements ITeamModel {
  constructor(private teamModel: ModelStatic<Team> = Team) {}

  public async findAll(): Promise<ITeam[]> {
    const allTeams = await this.teamModel.findAll();
    const allTeamsJSON = allTeams.map((team) => team.toJSON());
    return allTeamsJSON;
  }

  public async findById(id: ITeam['id']): Promise<ITeam | null> {
    const team = await this.teamModel.findByPk(id);
    if (!team) return null;
    const teamJSON = team.toJSON();
    return teamJSON;
  }
}
