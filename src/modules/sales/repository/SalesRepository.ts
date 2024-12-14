import { prisma } from '../../../database/prismaClient';
import { SalesPayload } from '../types';

export default class SalesRepository {
  private db: typeof prisma.sale;

  constructor() {
    this.db = prisma.sale;
  }

  public async getSales(
    companyId: string,
    skip: number,
    take: number,
    createdAt?: string,
  ) {
    const sales = await this.db.findMany({
      skip,
      take,
      where: {
        company_id: companyId,
        ...(createdAt ? { createdAt } : {}),
      },
      include: {
        Products: {
          include: {
            Product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalCount = await this.db.count({
      where: { company_id: companyId },
    });

    return { sales, totalCount };
  }

  public async createSale({
    client,
    companyId,
    products,
  }: SalesPayload): Promise<void> {
    await this.db.create({
      data: {
        client,
        company_id: companyId,
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
