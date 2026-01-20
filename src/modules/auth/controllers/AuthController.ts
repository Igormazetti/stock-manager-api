import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { object, string } from 'yup';
import LoginCompanyService from '../services/LoginCompany.service';
import LoginEmployeeService from '../services/LoginEmployee.service';

const LoginSchema = object({
  email: string().email().required(),
  password: string().required(),
});

export default class AuthController {
  public async loginCompany(request: Request, response: Response) {
    const { email, password } = await LoginSchema.validate(request.body);

    const loginService = container.resolve(LoginCompanyService);
    const result = await loginService.execute({ email, password });

    return response.status(result.status).json(result);
  }

  public async loginEmployee(request: Request, response: Response) {
    const { email, password } = await LoginSchema.validate(request.body);

    const loginService = container.resolve(LoginEmployeeService);
    const result = await loginService.execute({ email, password });

    return response.status(result.status).json(result);
  }
}
