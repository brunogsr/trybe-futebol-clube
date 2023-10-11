import { Request, Response, NextFunction } from 'express';

const validateMatches = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = body;
  if (!homeTeamId || !awayTeamId || !homeTeamGoals || !awayTeamGoals) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

export default validateMatches;
