import { Router } from 'express';
import { authMiddleware } from '../../../middleware/authMiddleware';
import RoleController from '../controllers/RoleController';

const router = Router();
const controller = new RoleController();

router.get('/', authMiddleware, controller.getAll);
router.post('/', authMiddleware, controller.create);
router.patch('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);

export default router;
