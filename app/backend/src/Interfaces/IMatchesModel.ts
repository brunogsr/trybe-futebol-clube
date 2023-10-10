interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

interface IMatchesModel {
  findAll(inProgress?: boolean): Promise<IMatches[]>
  updateFinishProgress(id: number, inProgress: boolean): Promise< object | null>
}
//
export {
  IMatches,
  IMatchesModel,
};
