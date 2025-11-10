import ProductRepository from '../repository/ProductRepository';

interface IRequest {
  productId: string;
  title?: string;
  value?: number;
  originalValue?: number;
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
    originalValue,
    description,
    imgUrl,
    quantity,
  }: IRequest) {
    const product = await this.productRepository.getProductById(productId);

    if (!product) {
      return {
        status: 404,
        errorMessage: 'Produto não encontrado',
      };
    }

    await this.productRepository.updateProduct(productId, {
      title,
      value,
      originalValue,
      description,
      imgUrl,
      quantity,
    });

    return {
      status: 200,
    };
  }
}
