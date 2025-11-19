import CompanyRepository from '../repository/CompanyRepository';

interface IUpdateCompanyData {
  name?: string;
  email?: string;
  logoUrl?: string;
}

export default class UpdateCompanyService {
  private companyRepository: CompanyRepository;

  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  public async execute(companyId: string, data: IUpdateCompanyData) {
    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      return {
        status: 404,
        errorMessage: 'Empresa não encontrada!',
      };
    }

    // Check if new email is unique (only if email is being updated)
    if (data.email && data.email !== company.email) {
      const emailExists = await this.companyRepository.findByEmail(data.email);
      if (emailExists) {
        return {
          status: 422,
          errorMessage: 'Email já está registrado!',
        };
      }
    }

    const updatedCompany = await this.companyRepository.updateCompany(companyId, data);

    return {
      status: 200,
      company: {
        id: updatedCompany.id,
        name: updatedCompany.name,
        email: updatedCompany.email,
        logoUrl: updatedCompany.logoUrl,
        valid: updatedCompany.valid,
      },
    };
  }
}
