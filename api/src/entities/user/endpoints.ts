import { Router } from 'express';
import { is } from '@middlewares/permissions';
import * as user from './controller';

const endpoints = Router();

endpoints.get('/', user.getAll);
endpoints.get('/:id', user.getById);
endpoints.patch('/:id', is.Self, user.update);
endpoints.delete('/:id', is.Admin, user.remove);

export default endpoints;
