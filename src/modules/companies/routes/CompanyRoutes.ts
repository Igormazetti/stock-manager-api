import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';
import { authMiddleware } from '../../../middleware/authMiddleware';

const companyRouter = Router();
const companyController = new CompanyController();

companyRouter.post('/', companyController.create);
companyRouter.post('/login', companyController.login);
companyRouter.post('/reset-password', authMiddleware, companyController.resetPassword);
companyRouter.put('/update', authMiddleware, companyController.update);

export default companyRouter;
