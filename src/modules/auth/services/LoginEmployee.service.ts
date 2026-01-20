import { prisma } from '../../../database/prismaClient';
import { checkPassword } from '../../../utils/hash';
import Token from '../../../utils/jwt';
import { LoginPayload, LoginResponse } from '../types';

export default class LoginEmployeeService {
  public async execute({ email, password }: LoginPayload): Promise<LoginResponse> {
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
      return { status: 401, errorMessage: 'Email ou senha inválidos' };
    }

    if (!employee.active) {
      return { status: 401, errorMessage: 'Usuário desativado' };
    }

    const isValidPassword = await checkPassword(password, employee.password);
    if (!isValidPassword) {
      return { status: 401, errorMessage: 'Email ou senha inválidos' };
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
}
