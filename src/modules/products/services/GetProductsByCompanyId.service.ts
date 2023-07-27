import { CustomError } from '../../../common/error/CustomError';
import ProductRepository from '../repository/ProductRepository';
import CompanyRepository from '../../companies/repository/CompanyRepository';

export default class getProductsByCompanyIdService {
  private productRepository: ProductRepository;
  private companyRepository: CompanyRepository;

  constructor() {
    this.productRepository = new ProductRepository();
    this.companyRepository = new CompanyRepository();
  }

  public async execute(companyId: string, skip: number, take: number) {
    const existingCompany = await this.companyRepository.findById(companyId);

    if (!existingCompany) {
      throw new CustomError('Empresa não encontrada!', 404);
    }

    const products = await this.productRepository.getProductsByCompanyId(
      companyId,
      skip,
      take,
    );

    return products;
  }
}
