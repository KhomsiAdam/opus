import { Router } from 'express';
// import { is } from '@middlewares/permissions';
import * as issue from './controller';

const endpoints = Router();

endpoints.post('/', issue.create);
endpoints.get('/', issue.getAll);
endpoints.get('/:id', issue.getById);
endpoints.patch('/:id', issue.update);
endpoints.patch('/:id/user', issue.affectUser);
endpoints.delete('/:id', issue.remove);

export default endpoints;
