import { Product } from '@prisma/client';
import { prisma } from '../../../database/prismaClient';

interface ProductPayload {
  title: string;
  value: number;
  description: string;
  imgUrl?: string;
  companyId: string;
  quantity: number;
}

interface UpdateProductPayload {
  title?: string;
  value?: number;
  description?: string;
  imgUrl?: string;
  quantity?: number;
}

export default class ProductRepository {
  private db: typeof prisma.product;

  constructor() {
    this.db = prisma.product;
  }

  public async createProduct({
    title,
    value,
    description,
    imgUrl,
    companyId,
    quantity,
  }: ProductPayload): Promise<void> {
    await this.db.create({
      data: { title, value, description, imgUrl, companyId, quantity },
    });
  }

  public async getProductsByCompanyId(
    companyId: string,
    skip: number,
    take: number,
  ): Promise<Product[]> {
    const products = await this.db.findMany({
      skip,
      take,
      where: { companyId },
    });

    return products;
  }

  public async getProductById(id: string) {
    const product = await this.db.findUnique({
      where: { id },
    });

    return product;
  }

  public async getProductByName(companyId: string, title: string) {
    const product = await this.db.findFirst({
      where: {
        title,
        companyId,
      },
    });

    return product;
  }

  public async updateProduct(id: string, data: UpdateProductPayload) {
    await this.db.update({
      where: { id },
      data,
    });
  }
}
