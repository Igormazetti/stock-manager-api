import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCompanyService from '../services/CreateCompanyService.service';
import LoginService from '../services/Login.service';
import ResetPasswordService from '../services/ResetPassword.service';
import UpdateCompanyService from '../services/UpdateCompany.service';
import GetCompanyService from '../services/GetCompany.service';

export default class CompanyController {
  public async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const creteCompanyService = container.resolve(CreateCompanyService);

    const company = await creteCompanyService.execute(name, email, password);

    return response.status(company.status).json(company);
  }

  public async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const loginService = container.resolve(LoginService);

    const session = await loginService.execute(email, password);

    return response.status(session.status).json(session);
  }

  public async resetPassword(request: Request, response: Response) {
    const { oldPassword, newPassword } = request.body;
    const companyId = request.company.id;

    const resetPasswordService = container.resolve(ResetPasswordService);

    const result = await resetPasswordService.execute(companyId, oldPassword, newPassword);

    return response.status(result.status).json(result);
  }

  public async update(request: Request, response: Response) {
    const { name, email, logoUrl, cnpj, address, phone, cep, city, state } = request.body;
    const companyId = request.company.id;

    const updateCompanyService = container.resolve(UpdateCompanyService);

    const result = await updateCompanyService.execute(companyId, {
      name,
      email,
      logoUrl,
      cnpj,
      address,
      phone,
      cep,
      city,
      state,
    });

    return response.status(result.status).json(result);
  }

  public async get(request: Request, response: Response) {
    const companyId = request.company.id;

    const getCompanyService = container.resolve(GetCompanyService);

    const result = await getCompanyService.execute(companyId);

    return response.status(result.status).json(result);
  }
}
