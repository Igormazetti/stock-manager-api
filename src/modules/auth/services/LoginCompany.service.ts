import { prisma } from '../../../database/prismaClient';
import { checkPassword } from '../../../utils/hash';
import Token from '../../../utils/jwt';
import { LoginPayload, LoginResponse } from '../types';

export default class LoginCompanyService {
  public async execute({ email, password }: LoginPayload): Promise<LoginResponse> {
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
      return { status: 401, errorMessage: 'Email ou senha inválidos' };
    }

    const isValidPassword = await checkPassword(password, company.password);
    if (!isValidPassword) {
      return { status: 401, errorMessage: 'Email ou senha inválidos' };
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
