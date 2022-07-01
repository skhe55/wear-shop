import { Sequelize } from "sequelize-typescript"
import { WearEntity } from "./entities/wear.entity";


export const DatabaseProviders = [
    {
        provide: 'WEAR_CONNECT',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: "postgres",
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                logging: false
            });
            sequelize.addModels([WearEntity])
            await sequelize.sync();
            return sequelize;
        }
    }
]