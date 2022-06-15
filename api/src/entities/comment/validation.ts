import Joi from 'joi';

export const createCommentSchema = Joi.object({
  body: Joi.string().trim().required(),
  date: Joi.date().required(),
  issue: Joi.string().required(),
  user: Joi.string().required(),
});

export const updateCommentSchema = Joi.object({
  body: Joi.string().trim(),
  date: Joi.date().required(),
});
