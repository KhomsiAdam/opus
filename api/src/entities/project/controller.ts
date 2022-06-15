import type { Request, Response, NextFunction } from 'express';
import * as controller from '@services/crud.service';

import { catchErrors } from '@helpers/catchErrors';
import { ProjectModel } from './model';
import { createProjectSchema, updateProjectSchema } from './validation';
import { SuccessMessages, ErrorMessages } from './constants';

export const create = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.create(req, res, next, createProjectSchema, ProjectModel, SuccessMessages.PROJECT_CREATED);
});

export const getAll = catchErrors(async (_req: Request, res: Response, next: NextFunction) => {
  controller.getAll(_req, res, next, ProjectModel, ErrorMessages.PROJECTS_NOT_FOUND);
});

export const getById = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.getByField(
    req,
    res,
    next,
    ProjectModel,
    ErrorMessages.PROJECT_NOT_FOUND,
    true,
    'users issues',
    '_id email firstname lastname title description type status priority listPosition users createdAt updatedAt',
  );
});

export const update = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.update(
    req,
    res,
    next,
    updateProjectSchema,
    ProjectModel,
    SuccessMessages.PROJECT_UPDATED,
    ErrorMessages.PROJECT_NOT_FOUND,
  );
});

export const remove = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.remove(req, res, next, ProjectModel, SuccessMessages.PROJECT_DELETED, ErrorMessages.PROJECT_NOT_FOUND);
});
