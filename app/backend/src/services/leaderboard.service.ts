import { IMatches } from '../Interfaces/IMatchesModel';
import { ITeamWithMatches } from '../Interfaces/ITeamModel';
import { ServiceResponse } from '../Interfaces/ITeamService';
// import MatchesModel from '../models/matches.model';
import TeamModel from '../models/team.model';

interface IMatchesResults {
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
}
const matchesResult = {
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
};

interface TeamInfo {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export default class LeaderboardService {
  constructor(private teamModel = new TeamModel()) {}

  private static getPoints(homeTeamGoals: number, awayTeamGoals: number): number {
    switch (true) {
      case homeTeamGoals > awayTeamGoals:
        return 3;
      case homeTeamGoals === awayTeamGoals:
        return 1;
      default:
        return 0;
    }
  }

  private static getTotalPoints(homeTeam: IMatches[]): number {
    const totalPoints = homeTeam.reduce((acc, curr) => acc + LeaderboardService
      .getPoints(curr.homeTeamGoals, curr.awayTeamGoals), 0);

    return totalPoints;
  }

  private static getMatchesResults(homeTeam: IMatches[]): IMatchesResults {
    const results = { ...matchesResult };
    homeTeam.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      const goals = LeaderboardService.getPoints(homeTeamGoals, awayTeamGoals);
      if (goals === 3) { results.totalVictories += 1; }
      if (goals === 1) { results.totalDraws += 1; }
      if (goals === 0) { results.totalLosses += 1; }
      results.goalsFavor += homeTeamGoals;
      results.goalsOwn += awayTeamGoals;
      results.goalsBalance = results.goalsFavor - results.goalsOwn;
    });

    return results;
  }

  private static getEfficiency(totalPoints: number, totalGames: number): number {
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }

  private static sortTeamPoints(teamPoints: TeamInfo[]): TeamInfo[] {
    return teamPoints.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
  }

  public async getLeaderboard(): Promise<ServiceResponse<TeamInfo[]>> {
    const allTeamsWithMatches = await this.teamModel.getTeamsWithMatches() as ITeamWithMatches[];
    const teamPoints: TeamInfo[] = [];
    allTeamsWithMatches.forEach((eachTeam) => {
      const { teamName, homeTeam } = eachTeam;
      const totalPoints = LeaderboardService.getTotalPoints(homeTeam);
      const resultsMatches = LeaderboardService.getMatchesResults(homeTeam);
      const efficiency = LeaderboardService.getEfficiency(totalPoints, homeTeam.length);
      const teamInfo: TeamInfo = {
        name: teamName,
        totalPoints,
        totalGames: homeTeam.length,
        efficiency,
        ...resultsMatches,
      };
      teamPoints.push(teamInfo);
    });

    const sortedTeamPoints = LeaderboardService.sortTeamPoints(teamPoints);
    return { status: 'SUCCESSFUL', data: sortedTeamPoints };
  }
}
