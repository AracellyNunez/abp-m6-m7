import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST || "localhost",
        port: process.env.PG_PORT || 5432,
        dialect: "postgres", // <- Asegúrate de que esté escrito explícitamente aquí
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: false
    }
);

export default sequelize;