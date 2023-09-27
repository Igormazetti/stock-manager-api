import Encrypt from '../../../utils/hash';
import { CustomError } from '../../../common/error/CustomError';
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
      throw new CustomError('E-mail já cadastrado!', 422);
    }

    const company = await this.companyRepository.createCompany({
      name,
      email,
      password: hashPassword,
    });

    return {
      id: company.id,
      name: company.name,
      email: company.email,
    };
  }
}
