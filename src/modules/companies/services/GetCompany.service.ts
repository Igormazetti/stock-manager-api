import CompanyRepository from '../repository/CompanyRepository';

export default class GetCompanyService {
  private companyRepository: CompanyRepository;

  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  public async execute(companyId: string) {
    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      return {
        status: 404,
        errorMessage: 'Empresa não encontrada!',
      };
    }

    return {
      status: 200,
      company: {
        id: company.id,
        name: company.name,
        email: company.email,
        logoUrl: company.logoUrl,
        valid: company.valid,
        cnpj: company.cnpj,
        address: company.address,
        phone: company.phone,
        cep: company.cep,
        city: company.city,
        state: company.state,
      },
    };
  }
}
