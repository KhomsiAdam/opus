import type { Request, Response, NextFunction } from 'express';
import * as controller from '@services/crud.service';

import { catchErrors } from '@helpers/catchErrors';
import { IssueModel } from './model';
import { createIssueSchema, updateIssueSchema } from './validation';
import { SuccessMessages, ErrorMessages } from './constants';

export const create = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.create(req, res, next, createIssueSchema, IssueModel, SuccessMessages.ISSUE_CREATED);
});

export const getAll = catchErrors(async (_req: Request, res: Response, next: NextFunction) => {
  controller.getAll(_req, res, next, IssueModel, ErrorMessages.ISSUES_NOT_FOUND, true, 'users');
});

export const getById = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.getByField(req, res, next, IssueModel, ErrorMessages.ISSUE_NOT_FOUND, true, 'users reporter comments', '');
});

export const update = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.update(
    req,
    res,
    next,
    updateIssueSchema,
    IssueModel,
    SuccessMessages.ISSUE_UPDATED,
    ErrorMessages.ISSUE_NOT_FOUND,
  );
});

export const remove = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  controller.remove(req, res, next, IssueModel, SuccessMessages.ISSUE_DELETED, ErrorMessages.ISSUE_NOT_FOUND);
});

export const affectUser = async (req: Request, _res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const query = { _id: id };
    const issue = await IssueModel.findOne(query);
    console.log(issue);
    // if (issue && issue.users) {
    //   issue?.users.push(req.body.user);
    //   issue.save();
    //   res.json({ message: 'User added to issue' });
    // } else {
    //   next({ message: ErrorMessages.ISSUE_NOT_FOUND });
    // }
  } catch (error) {
    next(error);
  }
};
