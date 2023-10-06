import { Model, QueryInterface, DataTypes } from "sequelize";

interface IUsers {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUsers>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      role: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  }
}