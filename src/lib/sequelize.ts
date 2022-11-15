import { Sequelize, DataTypes } from "sequelize";

import databaseConfig from "../../database.config";

// Creating multi environment database config
export const sequelize = process.env.ENVIRONMENT === "PROD" ?
    new Sequelize(
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
    ) : new Sequelize({
        dialect: "sqlite",
        storage: "dev.db"
    });

// Exporting data types from sequelize to use in models
export const types = DataTypes;