import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCompanyService from '../services/CreateCompanyService.service';

export default class CompanyController {
  public async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const creteCompanyService = container.resolve(CreateCompanyService);

    const company = await creteCompanyService.create(name, email, password);

    return response.status(200).json(company);
  }
}
