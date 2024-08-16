import { Sale } from '@prisma/client';
import { prisma } from '../../../database/prismaClient';
import { SalesPayload } from '../types';

export default class SalesRepository {
  private db: typeof prisma.sale;

  constructor() {
    this.db = prisma.sale;
  }

  public async getSales(companyId: string): Promise<Sale[]> {
    const sales = await this.db.findMany({
      where: {
        company_id: companyId,
      },
      include: {
        Products: {
          include: {
            Product: true,
          },
        },
      },
    });

    return sales;
  }

  public async createSale({
    client,
    companyId,
    products,
    employeeId,
  }: SalesPayload): Promise<void> {
    await this.db.create({
      data: {
        client,
        company_id: companyId,
        employee_id: employeeId,
        Products: {
          createMany: {
            data: products.map((product) => ({
              product_id: product.id,
              quantity_sold: product.quantity,
            })),
          },
        },
      },
    });
  }
}
