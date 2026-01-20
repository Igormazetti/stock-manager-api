import { prisma } from '../../../database/prismaClient';
import { CreateEmployeePayload, UpdateEmployeePayload } from '../types';

export default class EmployeeRepository {
  private db = prisma.employee;

  public async create(data: CreateEmployeePayload) {
    return this.db.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        roleId: data.roleId,
        companyId: data.companyId,
      },
      include: {
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
  }

  public async getByCompanyId(companyId: string, active?: boolean) {
    return this.db.findMany({
      where: {
        companyId,
        ...(active !== undefined && { active }),
      },
      include: {
        Role: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  public async getById(id: string) {
    return this.db.findUnique({
      where: { id },
      include: {
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
  }

  public async getByEmail(email: string) {
    return this.db.findUnique({
      where: { email },
    });
  }

  public async update(id: string, data: UpdateEmployeePayload) {
    return this.db.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
        ...(data.password && { password: data.password }),
        ...(data.roleId && { roleId: data.roleId }),
        ...(data.active !== undefined && { active: data.active }),
      },
      include: {
        Role: true,
      },
    });
  }

  public async delete(id: string) {
    return this.db.delete({
      where: { id },
    });
  }
}
