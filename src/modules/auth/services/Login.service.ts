import { prisma } from '../../../database/prismaClient';
import { checkPassword } from '../../../utils/hash';
import Token from '../../../utils/jwt';
import { LoginPayload, LoginResponse } from '../types';

export default class LoginService {
  public async execute({ email, password }: LoginPayload): Promise<LoginResponse> {
    const employeeResult = await this.tryEmployeeLogin(email, password);
    if (employeeResult) {
      return employeeResult;
    }

    const companyResult = await this.tryCompanyLogin(email, password);

    if (companyResult) {
      return companyResult;
    }

    return { status: 401, errorMessage: 'Email ou senha inválidos' };
  }

  private async tryEmployeeLogin(email: string, password: string): Promise<LoginResponse | null> {
    const employee = await prisma.employee.findUnique({
      where: { email },
      include: {
        Company: true,
        Role: {
          include: {
            permissions: {
              include: {
                Permission: true,
              },
            },
          },
        },
      },
    });

    if (!employee) {
      return null;
    }

    if (!employee.active) {
      return { status: 401, errorMessage: 'Usuário desativado' };
    }

    const isValidPassword = await checkPassword(password, employee.password);
    if (!isValidPassword) {
      return null;
    }

    const tokenInstance = new Token();
    const token = tokenInstance.createUserToken({
      id: employee.id,
      type: 'employee',
      companyId: employee.companyId,
    });

    const permissions = employee.Role?.permissions.map(
      (rp) => rp.Permission.permission
    ) || [];

    return {
      status: 200,
      token,
      user: {
        id: employee.id,
        type: 'employee',
        name: employee.name,
        email: employee.email,
        companyId: employee.companyId,
        permissions,
      },
    };
  }

  private async tryCompanyLogin(email: string, password: string): Promise<LoginResponse | null> {
    const company = await prisma.company.findUnique({
      where: { email },
      include: {
        DefaultRole: {
          include: {
            permissions: {
              include: {
                Permission: true,
              },
            },
          },
        },
      },
    });

    if (!company) {
      return null;
    }

    const isValidPassword = await checkPassword(password, company.password);
    if (!isValidPassword) {
      return null;
    }

    const tokenInstance = new Token();
    const token = tokenInstance.createUserToken({
      id: company.id,
      type: 'company',
      companyId: company.id,
    });

    const permissions = company.DefaultRole?.permissions.map(
      (rp) => rp.Permission.permission
    ) || [];

    return {
      status: 200,
      token,
      user: {
        id: company.id,
        type: 'company',
        name: company.name,
        email: company.email,
        companyId: company.id,
        permissions,
      },
    };
  }
}
