import CompanyRepository from 'modules/companies/repository/CompanyRepository';
import SalesRepository from '../repository/SalesRepository';

export default class GetSaleService {
  private companyRepository: CompanyRepository;

  private salesRepository: SalesRepository;

  constructor() {
    this.companyRepository = new CompanyRepository();
    this.salesRepository = new SalesRepository();
  }

  public async execute(companyId: string, skip: number, createdAt?: string) {
    const existingCompany = await this.companyRepository.findById(companyId);
    const take = 30;

    if (!existingCompany) {
      return {
        status: 404,
        errorMessage: 'Empresa não encontrada',
      };
    }

    const sales = await this.salesRepository.getSales(
      companyId,
      skip,
      take,
      createdAt,
    );

    return {
      status: 200,
      sales,
    };
  }
}
