import { ModelStatic } from 'sequelize';
import { IMatches, IMatchesModel } from '../Interfaces/IMatchesModel';
import Matches from '../database/models/matches.model';
import Team from '../database/models/team.model';

export default class MatchesModel implements IMatchesModel {
  constructor(private matchesModel: ModelStatic<Matches> = Matches) {}

  public async findAll(): Promise<IMatches[]> {
    const allMatches = await this.matchesModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    const allMatchesJSON = allMatches.map((team) => team.toJSON());
    return allMatchesJSON;
  }

  // public async findById(id: IMatches['id']): Promise<IMatches | null> {
  //   const team = await this.matchesModel.findByPk(id);
  //   if (!team) return null;
  //   const teamJSON = team.toJSON();
  //   return teamJSON;
  // }
}
