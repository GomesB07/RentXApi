import { Router } from 'express';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';

import multer from 'multer';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController';

const upload = multer({
  dest: './tmp',
});

const categoryRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoryRoutes.post('/', createCategoryController.handle);

categoryRoutes.get('/', listCategoriesController.handle);

categoryRoutes.post('/import', upload.single('file'), importCategoryController.handle);

export { categoryRoutes };
