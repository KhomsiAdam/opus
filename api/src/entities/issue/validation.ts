import Joi from 'joi';

export const createIssueSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  type: Joi.string().trim().required(),
  status: Joi.string().trim().required(),
  priority: Joi.number().required(),
  reporter: Joi.string().required(),
  project: Joi.string().required(),
  users: Joi.array().items(Joi.string()),
});

export const updateIssueSchema = Joi.object({
  title: Joi.string().trim(),
  description: Joi.string().trim(),
  type: Joi.string().trim(),
  status: Joi.string().trim(),
  priority: Joi.number(),
  listPosition: Joi.number(),
  reporter: Joi.string(),
  project: Joi.string(),
  estimate: Joi.number(),
  timeSpent: Joi.number(),
  timeRemaining: Joi.number(),
  comments: Joi.array().items(Joi.string()),
  users: Joi.array().items(Joi.string()),
});
