import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "tasksdb",
  "user",
  "pass",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);
