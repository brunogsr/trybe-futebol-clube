import * as jwt from 'jsonwebtoken';

interface JwtOptions {
  expiresIn: string;
  algorithm: string;
}

export default class Token {
  static secret: string = process.env.JWT_SECRET || 'jwt_secret';
  static options: jwt.SignOptions & JwtOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  static generateToken(payload: object) {
    return jwt.sign(payload, Token.secret, Token.options);
  }

  static verifyToken(payload: string) {
    try {
      const token = jwt.verify(payload, Token.secret);
      return token;
    } catch (error) {
      return null;
    }
  }
}
