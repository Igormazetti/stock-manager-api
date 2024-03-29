import { Product } from '@prisma/client';
import { prisma } from '../../../database/prismaClient';

interface ProductPayload {
  title: string;
  value: number;
  description: string;
  imgUrl: string;
  companyId: string;
}

interface UpdateProductPayload {
  title?: string;
  value?: number;
  description?: string;
  imgUrl?: string;
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
  }: ProductPayload): Promise<Product> {
    const product = await this.db.create({
      data: { title, value, description, imgUrl, companyId },
    });
    return product;
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

  public async updateProduct(id: string, data: UpdateProductPayload) {
    const product = await this.db.update({
      where: { id },
      data,
    });
  }
}
