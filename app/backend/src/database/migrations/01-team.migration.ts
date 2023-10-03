import { Model, QueryInterface, DataTypes } from "sequelize";

interface ITeamMigration {
  id: number,
  team_name: string,
}

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeamMigration>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      team_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams')
  }
}