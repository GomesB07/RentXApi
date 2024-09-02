import { Router } from 'express';
import { CreateSpecificationsController } from '../modules/cars/useCases/createSpecifications/CreateSpecificationsController';
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', createSpecificationsController.handle);
specificationsRoutes.get('/', listSpecificationsController.handle);

export { specificationsRoutes };
