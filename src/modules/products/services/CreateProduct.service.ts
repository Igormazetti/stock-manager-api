import ProductRepository from '../repository/ProductRepository';

interface IRequest {
  title: string;
  code?: string;
  value: number;
  originalValue: number;
  description: string;
  companyId: string;
  imgUrl?: string;
  quantity: number;
}

export default class CreateProductsService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async execute({
    title,
    code,
    value,
    originalValue,
    description,
    imgUrl,
    companyId,
    quantity,
  }: IRequest) {
    const product = await this.productRepository.getProductByName(
      companyId,
      title,
    );

    if (product) {
      return {
        status: 422,
        errorMessage: 'Já existe produto cadastrado com este nome',
      };
    }

    await this.productRepository.createProduct({
      title,
      code,
      value,
      originalValue,
      description,
      imgUrl,
      companyId,
      quantity,
    });

    return {
      status: 200,
    };
  }
}
