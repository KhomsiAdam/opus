import { Router } from 'express';
// import { is } from '@middlewares/permissions';
import * as comment from './controller';

const endpoints = Router();

endpoints.post('/', comment.create);
endpoints.get('/', comment.getAll);
endpoints.get('/:id', comment.getById);
endpoints.patch('/:id', comment.update);
endpoints.delete('/:id', comment.remove);

export default endpoints;
