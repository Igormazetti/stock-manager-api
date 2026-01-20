import { prisma } from '../../../database/prismaClient';
import { CreateRolePayload, UpdateRolePayload } from '../types';

export default class RoleRepository {
  private db = prisma.role;

  public async create(companyId: string, data: CreateRolePayload) {
    const { name, description, permissionIds } = data;

    return this.db.create({
      data: {
        name,
        description,
        companyId,
        permissions: {
          create: permissionIds.map((permissionId) => ({
            permissionId,
          })),
        },
      },
      include: {
        permissions: {
          include: {
            Permission: true,
          },
        },
      },
    });
  }

  public async getByCompanyId(companyId: string) {
    return this.db.findMany({
      where: {
        OR: [
          { companyId: null }, // Roles globais (Admin)
          { companyId },       // Roles customizadas da empresa
        ],
      },
      include: {
        permissions: {
          include: {
            Permission: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  public async getById(id: string) {
    return this.db.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            Permission: true,
          },
        },
      },
    });
  }

  public async getByNameAndCompanyId(name: string, companyId: string | null) {
    return this.db.findFirst({
      where: { name, companyId },
    });
  }

  public async update(id: string, data: UpdateRolePayload) {
    const { name, description, permissionIds } = data;

    // Se permissionIds foi fornecido, atualizar as permissions
    if (permissionIds !== undefined) {
      // Deletar permissions existentes
      await prisma.rolePermission.deleteMany({
        where: { roleId: id },
      });

      // Criar novas permissions
      await prisma.rolePermission.createMany({
        data: permissionIds.map((permissionId) => ({
          roleId: id,
          permissionId,
        })),
      });
    }

    return this.db.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
      },
      include: {
        permissions: {
          include: {
            Permission: true,
          },
        },
      },
    });
  }

  public async delete(id: string) {
    return this.db.delete({
      where: { id },
    });
  }

  public async hasEmployees(roleId: string) {
    const count = await prisma.employee.count({
      where: { roleId },
    });
    return count > 0;
  }
}
