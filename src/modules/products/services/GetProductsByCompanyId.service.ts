import ProductRepository from '../repository/ProductRepository';
import CompanyRepository from '../../companies/repository/CompanyRepository';

export default class GetProductsByCompanyIdService {
  private productRepository: ProductRepository;
  private companyRepository: CompanyRepository;

  constructor() {
    this.productRepository = new ProductRepository();
    this.companyRepository = new CompanyRepository();
  }

  public async execute(companyId: string, skip: number) {
    const existingCompany = await this.companyRepository.findById(companyId);

    if (!existingCompany) {
      return {
        status: 404,
        errorMessage: 'Empresa não encontrada!',
      };
    }

    const products = await this.productRepository.getProductsByCompanyId(
      companyId,
      skip,
      8,
    );

    const pages = products.length / 8;

    return {
      status: 200,
      products,
      pages: pages < 1 ? 1 : pages,
    };
  }
}
