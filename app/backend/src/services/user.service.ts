import * as Bcrypt from 'bcryptjs';
import Token from '../utils/token';
import { ServiceResponse } from '../Interfaces/ITeamService';
import UserModel from '../models/user.model';
import { IUser } from '../Interfaces/IUserModel';

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  public async login(
    email: IUser['email'],
    password: IUser['password'],
  ): Promise<ServiceResponse<IUser | { token: string }>> {
    const user = await this.userModel.login(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    const validPassword = await Bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const { password: _, ...userWithoutPassword } = user;
    const token = Token.generateToken(userWithoutPassword);

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
