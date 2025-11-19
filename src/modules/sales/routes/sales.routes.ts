import { Router } from 'express';
import SalesController from '../controllers/SalesController';
import { authMiddleware } from '../../../middleware/authMiddleware';

const salesRouter = Router();
const salesController = new SalesController();

salesRouter.post('/create', authMiddleware, salesController.create);
salesRouter.get('/', authMiddleware, salesController.getAll);
salesRouter.patch('/:id', authMiddleware, (request, response) =>
  salesController.update(request, response),
);

export default salesRouter;
