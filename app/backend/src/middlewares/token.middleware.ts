import { Request, Response, NextFunction } from 'express';
import Token from '../utils/token';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const payload = Token.verifyToken(authorization);
  if (!payload) return res.status(401).json({ message: 'Token must be a valid token' });

  req.body.payload = payload;
  next();
};

export default {
  validateToken,
};
