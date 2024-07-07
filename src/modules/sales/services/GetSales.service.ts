import CompanyRepository from 'modules/companies/repository/CompanyRepository';
import { CustomError } from '../../../common/error/CustomError';
import SalesRepository from '../repository/SalesRepository';

export default class GetSaleService {
  private companyRepository: CompanyRepository;

  private salesRepository: SalesRepository;

  constructor() {
    this.companyRepository = new CompanyRepository();
    this.salesRepository = new SalesRepository();
  }

  public async execute(companyId: string) {
    const existingCompany = await this.companyRepository.findById(companyId);

    if (!existingCompany) {
      throw new CustomError('Empresa não encontrada', 404);
    }

    const sales = await this.salesRepository.getSales(companyId);

    return sales;
  }
}
