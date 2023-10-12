import { Request, Response, NextFunction } from 'express';
import Token from '../utils/token';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) return res.status(401).json({ message: 'Token not found' });

  const [, token] = bearerToken.split(' ');

  const payload = Token.verifyToken(token);

  if (!payload) return res.status(401).json({ message: 'Token must be a valid token' });

  req.body.payload = payload;
  next();
};

export default { validateToken };
