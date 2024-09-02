import { Router } from 'express';
import { categoryRoutes } from './category.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './user.routes';
import { authenticateRoutes } from './authenticate.routes';

const router = Router();

router.use('/categories', categoryRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use(authenticateRoutes);

export { router };
