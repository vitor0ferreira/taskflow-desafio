import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db";


interface TaskAttributes {
  id?: number;
  title: string;
  description: string;
  status: "pendente" | "em andamento" | "concluida";
  userId: number;
}

class Task extends Model<TaskAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: "pendente" | "em andamento" | "concluida";
  public userId!: number;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pendente", "em andamento", "concluida"),
      defaultValue: "pendente",
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
  }
);

export default Task;
