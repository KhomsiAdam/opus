import { Router } from 'express';
// import { is } from '@middlewares/permissions';
import * as project from './controller';

const endpoints = Router();

endpoints.post('/', project.create);
endpoints.get('/', project.getAll);
endpoints.get('/:id', project.getById);
endpoints.patch('/:id', project.update);
endpoints.delete('/:id', project.remove);

export default endpoints;
