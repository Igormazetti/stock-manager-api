import { Company } from '@prisma/client';
import { prisma } from '../../../database/prismaClient';

interface ICompany {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export default class CompanyRepository {
  private db: typeof prisma.company;
  constructor() {
    this.db = prisma.company;
  }

  public async createCompany({
    name,
    email,
    password,
  }: ICompany): Promise<Company> {
    const user = await this.db.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  public async getAllCompanies(): Promise<Company[]> {
    const company = await this.db.findMany();
    return company;
  }

  public async findById(id: string): Promise<Company | null> {
    const company = await this.db.findUnique({
      where: {
        id,
      },
    });

    return company;
  }

  public async findByEmail(email: string): Promise<Company | null> {
    const company = await this.db.findUnique({
      where: {
        email,
      },
    });

    return company;
  }

  public async updateCompany(
    id: string,
    data: {
      name?: string;
      email?: string;
      password?: string;
      logoUrl?: string;
    },
  ): Promise<Company> {
    const company = await this.db.update({
      where: { id },
      data,
    });

    return company;
  }
}
