import { Request, Response, NextFunction } from 'express';
import errorMap from './errors';
import loginSchema from './loginSchema';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { error } = loginSchema.validate(body);
  if (error) {
    const { details } = error;
    const [{ type }] = details;
    if (type === 'string.email' || type === 'string.min') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const statusCode = errorMap(details[0].type);
    return res.status(statusCode).json({ message: 'All fields must be filled' });
  }
  next();
};

export default {
  validateLogin,
};
