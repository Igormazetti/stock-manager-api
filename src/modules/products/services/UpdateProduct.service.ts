import { CustomError } from '../../../common/error/CustomError';
import ProductRepository from '../repository/ProductRepository';

interface IRequest {
  productId: string;
  title?: string;
  value?: number;
  description?: string;
  imgUrl?: string;
  quantity?: number;
}

export default class UpdateProductsService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async execute({
    productId,
    title,
    value,
    description,
    imgUrl,
    quantity,
  }: IRequest) {
    const product = await this.productRepository.getProductById(productId);

    if (!product) {
      throw new CustomError('Produto não encontrado', 404);
    }

    await this.productRepository.updateProduct(productId, {
      title,
      value,
      description,
      imgUrl,
      quantity,
    });
  }
}
