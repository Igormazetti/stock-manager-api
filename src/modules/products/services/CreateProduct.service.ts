import { CustomError } from '../../../common/error/CustomError';
import ProductRepository from '../repository/ProductRepository';

interface IRequest {
  title: string;
  value: number;
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
    value,
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
      throw new CustomError('Já existe produto cadastrado com este nome', 422);
    }

    await this.productRepository.createProduct({
      title,
      value,
      description,
      imgUrl,
      companyId,
      quantity,
    });
  }
}
