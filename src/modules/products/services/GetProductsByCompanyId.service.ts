import ProductRepository from '../repository/ProductRepository';
import CompanyRepository from '../../companies/repository/CompanyRepository';

export default class GetProductsByCompanyIdService {
  private productRepository: ProductRepository;
  private companyRepository: CompanyRepository;

  constructor() {
    this.productRepository = new ProductRepository();
    this.companyRepository = new CompanyRepository();
  }

  public async execute(companyId: string, skip: number, name?: string, order?: string) {
    const existingCompany = await this.companyRepository.findById(companyId);
    const take = 8;

    if (!existingCompany) {
      return {
        status: 404,
        errorMessage: 'Empresa não encontrada!',
      };
    }

    const outOfStock = order === 'sem' ? true : false;

    const orderBy = order === 'sem' ? undefined : order;

    const products = await this.productRepository.getProductsByCompanyId(
      companyId,
      skip,
      take,
      name,
      orderBy,
      outOfStock
    );

    const pages = Math.ceil(products.totalCount / take);

    return {
      status: 200,
      products: products.products,
      pages,
    };
  }
}
