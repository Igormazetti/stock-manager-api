import { Employee } from '@prisma/client';
import { prisma } from '../../../database/prismaClient';
import { EmployeePayload, UpdateEmployeePayload } from '../types';

export default class EmployeeRepository {
  private db: typeof prisma.employee;

  constructor() {
    this.db = prisma.employee;
  }

  public async createEmployee({ name }: EmployeePayload): Promise<void> {
    await this.db.create({
      data: { name, active: true },
    });
  }

  public async getEmployees({
    active,
  }: {
    active?: boolean;
  }): Promise<Employee[]> {
    const employee = await this.db.findMany({
      where: { active },
    });

    return employee;
  }

  public async getByName(name: string): Promise<Employee | null> {
    const employee = await this.db.findFirst({
      where: { name },
    });

    return employee;
  }

  public async getById(id: string): Promise<Employee | null> {
    const employee = await this.db.findUnique({
      where: { id },
    });

    return employee;
  }

  public async updateEmployee(id: string, data: UpdateEmployeePayload) {
    await this.db.update({
      where: { id },
      data,
    });
  }
}
