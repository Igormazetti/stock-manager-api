import { prisma } from '../../../database/prismaClient';

export default class PermissionRepository {
  private db = prisma.permission;

  public async getAll() {
    return this.db.findMany({
      orderBy: { permission: 'asc' },
    });
  }

  public async getById(id: number) {
    return this.db.findUnique({
      where: { id },
    });
  }

  public async getByPermission(permission: string) {
    return this.db.findUnique({
      where: { permission },
    });
  }
}
