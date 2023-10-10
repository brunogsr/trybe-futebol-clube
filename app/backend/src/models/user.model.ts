import { ModelStatic } from 'sequelize';
import { IUser, IUserModel } from '../Interfaces/IUserModel';
import User from '../database/models/user.model';

export default class UserModel implements IUserModel {
  constructor(private userModel: ModelStatic<User> = User) {}
  public async login(email: IUser['email']): Promise<IUser | null> {
    const user = await this.userModel.findOne({ where: { email } });
    console.log(user);

    if (!user) return null;
    const userJSON = user.toJSON();
    return userJSON;
  }
}
