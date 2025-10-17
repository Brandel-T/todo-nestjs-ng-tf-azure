import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_DB: Joi.string().default('test'),
  POSTGRES_PORT: Joi.number().port().default(5432),
  POSTGRES_HOST: Joi.string().hostname().default('localhost'),
});
