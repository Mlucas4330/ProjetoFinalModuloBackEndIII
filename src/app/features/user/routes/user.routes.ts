import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const userRoutes = Router();

const userController = new UserController();

userRoutes.get('/', userController.list);

userRoutes.get('/:id', userController.get);

userRoutes.post('/', userController.createUser);

userRoutes.post('/login', userController.login);

userRoutes.put('/:id', userController.update);

userRoutes.delete('/:id', userController.delete);

export { userRoutes };
