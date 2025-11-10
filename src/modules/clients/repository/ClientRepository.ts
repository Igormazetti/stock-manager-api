import { Client } from '@prisma/client';
import { prisma } from '../../../database/prismaClient';

interface ClientPayload {
  name: string;
  email?: string;
  address: string;
  observations?: string;
  companyId: string;
}

interface UpdateClientPayload {
  name?: string;
  email?: string;
  address?: string;
  observations?: string;
}

export default class ClientRepository {
  private db: typeof prisma.client;

  constructor() {
    this.db = prisma.client;
  }

  public async createClient({
    name,
    email,
    address,
    observations,
    companyId,
  }: ClientPayload): Promise<void> {
    await this.db.create({
      data: { name, email, address, observations, companyId },
    });
  }

  public async getClientsByCompanyId(
    companyId: string,
    skip: number,
    take: number,
    name?: string
  ): Promise<{ clients: Client[]; totalCount: number }> {
    const clients = await this.db.findMany({
      skip,
      take,
      where: {
        companyId,
        ...(name
          ? {
              name: {
                contains: name,
                mode: 'insensitive',
              },
            }
          : {}),
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalCount = await this.db.count({
      where: { companyId },
    });

    return { clients, totalCount };
  }

  public async getClientById(id: string) {
    const client = await this.db.findUnique({
      where: { id },
    });

    return client;
  }

  public async getClientByEmail(companyId: string, email: string) {
    const client = await this.db.findFirst({
      where: {
        email,
        companyId,
      },
    });

    return client;
  }

  public async updateClient(id: string, data: UpdateClientPayload) {
    await this.db.update({
      where: { id },
      data,
    });
  }

  public async deleteClient(id: string) {
    await this.db.delete({
      where: { id },
    });
  }
}
