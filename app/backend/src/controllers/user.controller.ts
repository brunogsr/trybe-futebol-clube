import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.userService.login(email, password);
    if (status === 'UNAUTHORIZED') return res.status(401).json(data);
    return res.status(200).json(data);
  }

  public getRole = (req: Request, res: Response) => {
    const { role } = req.body.payload;
    return res.status(200).json({ role });
  };
}
