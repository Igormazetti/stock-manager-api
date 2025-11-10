import { Router } from 'express';
import ClientController from '../controllers/ClientController';
import { authMiddleware } from '../../../middleware/authMiddleware';

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.get('/', authMiddleware, clientController.getClientsByCompanyId);
clientRouter.post('/create', authMiddleware, clientController.create);
clientRouter.patch('/update/:id', authMiddleware, clientController.update);
clientRouter.delete('/delete/:id', authMiddleware, clientController.delete);

export default clientRouter;
