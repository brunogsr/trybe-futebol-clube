import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { ITeam } from '../../Interfaces/ITeamModel';
import db from '.';

class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> implements ITeam {
  public id!: number;
  public teamName!: string;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Team',
    timestamps: false,
    underscored: true,
  },
);

export default Team;
