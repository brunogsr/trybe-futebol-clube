import { ModelStatic } from 'sequelize';
import { IMatches, IMatchesModel } from '../Interfaces/IMatchesModel';
import Matches from '../database/models/matches.model';
import Team from '../database/models/team.model';

export default class MatchesModel implements IMatchesModel {
  constructor(private matchesModel: ModelStatic<Matches> = Matches) {}

  public async findAll(inProgress?: boolean): Promise<IMatches[]> {
    const ifInProgressExists = inProgress === true || inProgress === false ? { inProgress } : {};
    const allMatches = await this.matchesModel.findAll({
      where: ifInProgressExists,
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    const allMatchesJSON = allMatches.map((team) => team.toJSON());
    return allMatchesJSON;
  }

  public async updateFinishProgress(id: number): Promise<object | null> {
    const match = await this.matchesModel.findByPk(id);
    if (!match) return null;
    await match.update({ inProgress: false });
    return { message: 'Finished' };
  }

  public async updateInProgress(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<object | null> {
    const [match] = await this.matchesModel.findAll({
      where: { id },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (!match) return null;
    await match.update({ homeTeamGoals, awayTeamGoals });
    return { homeTeamGoals, awayTeamGoals };
  }

  public async createMatch(newMatch: IMatches): Promise<object | null> {
    const match = await this.matchesModel.create(newMatch);
    return match;
  }
}
