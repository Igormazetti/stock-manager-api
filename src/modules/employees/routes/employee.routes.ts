import { Router } from 'express';
import { authMiddleware } from '../../../middleware/authMiddleware';
import EmployeeController from '../controllers/EmployeesController';

const employeeRouter = Router();
const employeeController = new EmployeeController();

employeeRouter.post('/create', authMiddleware, employeeController.create);
employeeRouter.get('/', authMiddleware, employeeController.getEmployees);
employeeRouter.patch('/update/:id', authMiddleware, employeeController.update);

export default employeeRouter;
