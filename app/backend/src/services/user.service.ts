import { ServiceResponse } from '../Interfaces/ITeamService';
import UserModel from '../models/user.model';
import { IUser } from '../Interfaces/IUserModel';

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  public async login(
    email: IUser['email'],
    password: IUser['password'],
  ): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.login(email, password);
    if (!user) return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado' } };
    return { status: 'SUCCESSFUL', data: user };
  }
}
