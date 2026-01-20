import { prisma } from '../../../database/prismaClient';
import Encrypt from '../../../utils/hash';
import CompanyRepository from '../repository/CompanyRepository';

export default class CreateCompanyService {
  private companyRepository: CompanyRepository;
  private encrypt: Encrypt;

  constructor() {
    this.companyRepository = new CompanyRepository();
    this.encrypt = new Encrypt();
  }

  public async execute(name: string, email: string, password: string) {
    const hashPassword = this.encrypt.encryptPassword(password);

    const existingCompany = await this.companyRepository.findByEmail(email);

    if (existingCompany) {
      return {
        status: 422,
        errorMessage: 'E-mail já cadastrado!',
      };
    }

    // Buscar a role Admin global
    const adminRole = await prisma.role.findFirst({
      where: { name: 'Admin', companyId: null },
    });

    const company = await this.companyRepository.createCompany({
      name,
      email,
      password: hashPassword,
      defaultRoleId: adminRole?.id,
    });

    return {
      id: company.id,
      status: 200,
      name: company.name,
      email: company.email,
    };
  }
}
