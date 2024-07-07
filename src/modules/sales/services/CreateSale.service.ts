import { CustomError } from '../../../common/error/CustomError';
import SalesRepository from '../repository/SalesRepository';

interface IRequest {
  client: string;
  companyId: string;
  products: string[];
}

export default class CreateSaleService {
  private salesRepository: SalesRepository;

  constructor() {
    this.salesRepository = new SalesRepository();
  }

  public async execute({ client, companyId, products }: IRequest) {
    try {
      await this.salesRepository.createSale({
        client,
        companyId,
        products,
      });
    } catch (err) {
      throw new CustomError('Falha ao efetuar venda', 400);
    }
  }
}
