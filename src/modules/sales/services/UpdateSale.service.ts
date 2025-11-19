export interface UpdateSalePayload {
  paid?: boolean;
  paymentTime?: Date | null;
}

import SalesRepository from '../repository/SalesRepository';

export default class UpdateSaleService {
  private salesRepository: SalesRepository;

  constructor() {
    this.salesRepository = new SalesRepository();
  }

  public async execute(saleId: string, companyId: string, { paid, paymentTime }: UpdateSalePayload) {
    try {
      const sale = await this.salesRepository.getSaleById(saleId, companyId);

      if (!sale) {
        return {
          status: 404,
          errorMessage: 'Venda não encontrada',
        };
      }

      await this.salesRepository.updateSale(saleId, {
        paid,
        paymentTime,
      });

      return {
        status: 200,
      };
    } catch (err) {
      return {
        status: 400,
        errorMessage: 'Falha ao atualizar venda',
      };
    }
  }
}
