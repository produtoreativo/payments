import * as dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";
dotenv.config({ path: process.env.DOTENV_PATH || undefined });

const databaseConfig: ConnectionOptions = {
  type: "postgres",
  synchronize: false,
  logging: true,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/**/migration/*.ts`],
  url: process.env.DATABASE_URL,
  cli: {
    migrationsDir: 'src/migration'
  }
}

module.exports = databaseConfig;