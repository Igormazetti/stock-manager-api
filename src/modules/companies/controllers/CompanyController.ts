import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCompanyService from '../services/CreateCompanyService.service';
import LoginService from '../services/Login.service';

export default class CompanyController {
  public async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const creteCompanyService = container.resolve(CreateCompanyService);

    const company = await creteCompanyService.execute(name, email, password);

    return response.status(200).json(company);
  }

  public async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const loginService = container.resolve(LoginService);

    const session = await loginService.execute(email, password);

    return response.status(session.status).json(session);
  }
}
