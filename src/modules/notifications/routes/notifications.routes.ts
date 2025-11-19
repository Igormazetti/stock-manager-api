import { Router } from 'express';
import { authMiddleware } from '../../../middleware/authMiddleware';
import NotificationsController from '../controllers/NotificationsController';

const notificationsRouter = Router();
const notificationsController = new NotificationsController();

notificationsRouter.get('/', authMiddleware, (request, response) =>
  notificationsController.getAll(request, response),
);

notificationsRouter.patch('/:id', authMiddleware, (request, response) =>
  notificationsController.markAsRead(request, response),
);

export default notificationsRouter;
