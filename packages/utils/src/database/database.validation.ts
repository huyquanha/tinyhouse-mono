import Joi from 'joi';

export const databaseValidation = {
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_CLUSTER: Joi.string().required(),
  DB_NAME: Joi.string().required(),
};
