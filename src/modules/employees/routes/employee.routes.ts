import { Router } from 'express';
import { authMiddleware } from '../../../middleware/authMiddleware';
import EmployeeController from '../controllers/EmployeesController';

const employeeRouter = Router();
const employeeController = new EmployeeController();

employeeRouter.post('/', authMiddleware, employeeController.create);
employeeRouter.get('/', authMiddleware, employeeController.getEmployees);
employeeRouter.patch('/:id', authMiddleware, employeeController.update);
employeeRouter.delete('/:id', authMiddleware, employeeController.delete);

export default employeeRouter;
