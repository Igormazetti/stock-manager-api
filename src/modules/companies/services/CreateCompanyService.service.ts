import CompanyRepository from '../repository/CompanyRepository';

export default class CreateCompanyService {
  private companyRepository: CompanyRepository;

  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  public async create(name: string, email: string, password: string) {
    const company = await this.companyRepository.createCompany({
      name,
      email,
      password,
    });

    return company;
  }
}
