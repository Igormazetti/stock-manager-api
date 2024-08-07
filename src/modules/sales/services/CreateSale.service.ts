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

      return {
        status: 200,
      };
    } catch (err) {
      return {
        status: 400,
        errorMessage: 'Falha ao efetuar venda',
      };
    }
  }
}
