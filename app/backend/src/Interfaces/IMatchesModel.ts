interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

interface IMatchesModel {
  findAll(): Promise<IMatches[]>
  // findById(id: IMatches['id']): Promise<IMatches | null>
}

export {
  IMatches,
  IMatchesModel,
};
