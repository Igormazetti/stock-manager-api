import { Router } from 'express';
import { authMiddleware } from '../../../middleware/authMiddleware';
import PermissionController from '../controllers/PermissionController';

const router = Router();
const controller = new PermissionController();

router.get('/', authMiddleware, controller.getAll);

export default router;
