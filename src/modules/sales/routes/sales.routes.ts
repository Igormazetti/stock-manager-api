import { Router } from 'express';
import SalesController from '../controllers/SalesController';
import { authMiddleware } from '../../../middleware/authMiddleware';

const salesRouter = Router();
const salesController = new SalesController();

salesRouter.post('/create', authMiddleware, salesController.create);
salesRouter.get('/', authMiddleware, salesController.getAll);

export default salesRouter;
