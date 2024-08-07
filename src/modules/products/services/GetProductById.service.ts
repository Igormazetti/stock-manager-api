import ProductRepository from '../repository/ProductRepository';

export default class GetProductsByIdService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async execute(productId: string) {
    const product = await this.productRepository.getProductById(productId);

    if (!product) {
      return {
        status: 404,
        errorMessage: 'Produto não encontrado',
      };
    }

    return {
      status: 200,
      product,
    };
  }
}
