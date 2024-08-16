/* eslint-disable operator-linebreak */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { object, string, boolean } from 'yup';
import GetEmployeeService from '../services/GetEmployees.service';
import CreateEmployeeService from '../services/CreateEmplyee.service';
import UpdateEmployeeService from '../services/UpdateEmployee.service';

const CreateEmployeeSchema = object({
  name: string().required(),
});

const UpdateEmployeeSchema = object({
  name: string(),
  active: boolean(),
});

export default class EmployeeController {
  public async getEmployees(request: Request, response: Response) {
    const getEmployeeService = container.resolve(GetEmployeeService);
    const employees = await getEmployeeService.execute();

    return response.status(employees.status).json(employees);
  }

  public async create(request: Request, response: Response) {
    const { name } = await CreateEmployeeSchema.validate(request.body);
    const creteEmployeeService = container.resolve(CreateEmployeeService);

    const employee = await creteEmployeeService.execute(name);

    return response.status(employee.status).json(employee);
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;

    const { name, active } = await UpdateEmployeeSchema.validate(request.body);
    const updateEmployeeService = container.resolve(UpdateEmployeeService);

    const update = await updateEmployeeService.execute(id, {
      name,
      active,
    });

    return response.status(update.status).json(update);
  }
}
