interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

interface IUserModel {
  login(email: IUser['email']): Promise<IUser | null>
}

export {
  IUser,
  IUserModel,
};
