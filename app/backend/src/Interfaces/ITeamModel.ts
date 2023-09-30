interface ITeam {
  id: number,
  teamName: string,
}

interface ITeamModel {
  findAll(): Promise<ITeam[]>
  findById(id: ITeam['id']): Promise<ITeam | null>
}

export {
  ITeam,
  ITeamModel,
};
