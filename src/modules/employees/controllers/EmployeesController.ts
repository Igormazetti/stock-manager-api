import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { object, string, boolean } from 'yup';
import GetEmployeeService from '../services/GetEmployees.service';
import CreateEmployeeService from '../services/CreateEmplyee.service';
import UpdateEmployeeService from '../services/UpdateEmployee.service';
import DeleteEmployeeService from '../services/DeleteEmployee.service';

const CreateEmployeeSchema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().min(6).required(),
  roleId: string().required(),
});

const UpdateEmployeeSchema = object({
  name: string(),
  email: string().email(),
  password: string().min(6),
  roleId: string(),
  active: boolean(),
});

const filterEmployees = object({
  active: boolean(),
});

export default class EmployeeController {
  public async getEmployees(request: Request, response: Response) {
    const { companyId } = request.user;
    const { active } = await filterEmployees.validate(request.query);

    const getEmployeeService = container.resolve(GetEmployeeService);
    const employees = await getEmployeeService.execute({ companyId, active });

    return response.status(employees.status).json(employees);
  }

  public async create(request: Request, response: Response) {
    const { companyId } = request.user;
    const data = await CreateEmployeeSchema.validate(request.body);

    const createEmployeeService = container.resolve(CreateEmployeeService);
    const employee = await createEmployeeService.execute(data, companyId);

    return response.status(employee.status).json(employee);
  }

  public async update(request: Request, response: Response) {
    const { companyId } = request.user;
    const { id } = request.params;
    const data = await UpdateEmployeeSchema.validate(request.body);

    const updateEmployeeService = container.resolve(UpdateEmployeeService);
    const result = await updateEmployeeService.execute(id, companyId, data);

    return response.status(result.status).json(result);
  }

  public async delete(request: Request, response: Response) {
    const { companyId } = request.user;
    const { id } = request.params;

    const deleteEmployeeService = container.resolve(DeleteEmployeeService);
    const result = await deleteEmployeeService.execute(id, companyId);

    return response.status(result.status).json(result);
  }
}
