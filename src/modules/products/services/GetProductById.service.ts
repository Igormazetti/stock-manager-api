import { CustomError } from '../../../common/error/CustomError';
import ProductRepository from '../repository/ProductRepository';

export default class GetProductsByIdService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async execute(productId: string) {
    const product = await this.productRepository.getProductById(productId);

    if (!product) {
      throw new CustomError('Produto não encontrado', 404);
    }

    return product;
  }
}
