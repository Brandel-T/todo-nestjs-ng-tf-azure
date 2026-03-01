import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

// import { ConfigService } from '@nestjs/config';
// const configService = new ConfigService();

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: configService.get<string>('POSTGRES_HOST', 'localhost'),
//   port: parseInt(configService.get<string>('POSTGRES_PORT', '5432')),
//   username: configService.get<string>('POSTGRES_USER', 'postgres'),
//   password: configService.get<string>('POSTGRES_PASSWORD', 'postgres'),
//   database: configService.get<string>('POSTGRES_DB', 'tododb'),
//   entities: ['**/*.entity{.ts,.js}'],
//   migrations: ['src/database/migrations/*-migration{.ts,.js}'],
//   ssl:
//     process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
//   synchronize: false,
//   logging: true,
//   migrationsRun: false,
// });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'tododb',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
  ssl:
    process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
  synchronize: false,
  logging: true,
});
