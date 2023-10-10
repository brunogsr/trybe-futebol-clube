interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

interface IUserModel {
  login(email: IUser['email'], password: IUser['password']): Promise<IUser | null>
}

export {
  IUser,
  IUserModel,
};
