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
    clientName?: string,
    product?: string,
  ) {
    const whereConditions: any = {
      company_id: companyId,
    };

    // Filter by date (accepts date string like 2025-11-18 and searches for that day)
    if (createdAt) {
      const startOfDay = new Date(createdAt);
      const endOfDay = new Date(createdAt);
      endOfDay.setDate(endOfDay.getDate() + 1);

      whereConditions.createdAt = {
        gte: startOfDay,
        lt: endOfDay,
      };
    }

    // Filter by client name (case-insensitive)
    if (clientName) {
      whereConditions.Client = {
        name: {
          contains: clientName,
          mode: 'insensitive',
        },
      };
    }

    const sales = await this.db.findMany({
      skip,
      take,
      where: whereConditions,
      include: {
        Products: {
          include: {
            Product: true,
          },
        },
        Client: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Filter by product name (in-memory filtering after database query)
    let filteredSales = sales;
    if (product) {
      const productLower = product.toLowerCase();
      filteredSales = sales.filter((sale) =>
        sale.Products.some((productOnSale) =>
          productOnSale.Product.title.toLowerCase().includes(productLower),
        ),
      );
    }

    const totalCount = await this.db.count({
      where: whereConditions,
    });

    return { sales: filteredSales, totalCount };
  }

  public async createSale({
    clientId,
    companyId,
    products,
    discount,
    observation,
  }: SalesPayload): Promise<void> {
    console.log(discount, 'discount aqui');
    await this.db.create({
      data: {
        clientId,
        company_id: companyId,
        discount: discount || 0,
        observation,
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
