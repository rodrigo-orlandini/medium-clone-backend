import { Sequelize, DataTypes } from "sequelize";

import databaseConfig from "../../database.config";

export const sequelize = new Sequelize(
    databaseConfig.database, 
    databaseConfig.username, 
    databaseConfig.password, 
    {
        dialect: "postgres",
        host: databaseConfig.host,
        dialectOptions: {
            ssl: {
                 require: true,
                 rejectUnauthorized: false
               }
       }
    }
);

export const types = DataTypes;