import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import db from '.';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'User',
    timestamps: false,
    underscored: true,
  },
);
