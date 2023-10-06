import { ModelStatic } from 'sequelize';
import { IUser, IUserModel } from '../Interfaces/IUserModel';
import User from '../database/models/user.model';

export default class UserModel implements IUserModel {
  constructor(private userModel: ModelStatic<User> = User) {}
  public async login(email: IUser['email'], password: IUser['password']): Promise<IUser | null> {
    const user = await this.userModel.findOne({ where: { email, password } });
    if (!user) return null;
    const userJSON = user.toJSON();
    return userJSON;
  }
}
