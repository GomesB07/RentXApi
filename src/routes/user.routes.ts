import { Router } from 'express';
import { CreateUserController } from '../modules/account/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/account/useCases/updateUserAvatar/UpdateUserAvatarController';
import multer from 'multer';
import uploadConfig from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle);

export { usersRoutes };
