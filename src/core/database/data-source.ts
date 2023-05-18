import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const options = (): DataSourceOptions => {
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false, //!!process.env.DATABASE_SYNCHRONIZE,
    logging: false,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  };
};

export const appDataSource = new DataSource(options());
