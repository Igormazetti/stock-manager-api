import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';

const companyRouter = Router();
const companyController = new CompanyController();

companyRouter.post('/', companyController.create);
companyRouter.post('/login', companyController.login);

export default companyRouter;
