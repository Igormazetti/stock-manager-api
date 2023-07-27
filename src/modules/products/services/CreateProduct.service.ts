import { CustomError } from '../../../common/error/CustomError';
import ProductRepository from '../repository/ProductRepository';

export default class CreateProductsService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async execute(
    title: string,
    value: number,
    description: string,
    imgUrl: string,
    companyId: string,
  ) {
    const product = await this.productRepository.createProduct({
      title,
      value,
      description,
      imgUrl,
      companyId,
    });

    return product;
  }
}
