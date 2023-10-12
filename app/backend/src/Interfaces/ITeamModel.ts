import { IMatches } from './IMatchesModel';

interface ITeam {
  id: number,
  teamName: string,
}

interface ITeamWithMatches extends ITeam {
  homeTeam: IMatches[]
}

interface ITeamModel {
  findAll(): Promise<ITeam[]>
  findById(id: ITeam['id']): Promise<ITeam | null>
}

export {
  ITeam,
  ITeamModel,
  ITeamWithMatches,
};
