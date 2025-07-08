import * as dotenv from 'dotenv';

dotenv.config({ path: process.cwd() + `/.env` });

export const config = () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV,
  postgres: {
    url:
      'postgres://' +
      process.env.POSTGRES_USER +
      ':' +
      process.env.POSTGRES_PASSWORD +
      '@' +
      process.env.POSTGRES_HOST +
      ':' +
      (process.env.POSTGRES_PORT || '5432') +
      '/' +
      (process.env.POSTGRES_DB || 'test'),
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  },
});

// import { plainToInstance } from 'class-transformer';
// import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

// class EnvironmentVariables {
//   PORT: number;
//   NODE_ENV: string;
//   POSTGRES_PASSWORD: string;
//   POSTGRES_DB: string;
//   @IsNotEmpty()
//   @IsNumber()
//   POSTGRES_PORT: number;
// }
