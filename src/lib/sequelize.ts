import { Sequelize, DataTypes } from "sequelize";

import databaseConfig from "../../database.config";

// Creating sequelize instance and setting up database
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

// Exporting data types from sequelize to use in models
export const types = DataTypes;