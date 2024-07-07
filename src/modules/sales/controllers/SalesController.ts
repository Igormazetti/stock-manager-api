import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { object, string, array } from 'yup';
import CreateSaleService from '../services/CreateSale.service';
import GetSaleService from '../services/GetSales.service';

const CreateSalesSchema = object({
  client: string().required(),
  products: array().of(string().required()).required(),
});

export default class SalesController {
  public async create(request: Request, response: Response) {
    // eslint-disable-next-line max-len
    const { client, products } = await CreateSalesSchema.validate(request.body);
    const creteSaleService = container.resolve(CreateSaleService);
    const companyId = request.company.id;

    await creteSaleService.execute({
      client,
      companyId,
      products,
    });

    return response.status(200).json();
  }

  public async getAll(request: Request, response: Response) {
    const getSaleService = container.resolve(GetSaleService);
    const companyId = request.company.id;

    const sales = await getSaleService.execute(companyId);

    return response.status(200).json(sales);
  }
}
