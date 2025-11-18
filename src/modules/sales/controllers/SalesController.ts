import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { object, string, array, number } from 'yup';
import CreateSaleService from '../services/CreateSale.service';
import GetSaleService from '../services/GetSales.service';

const CreateSalesSchema = object({
  clientId: string().required(),
  discount: number().optional(),
  observation: string().optional(),
  products: array(
    object({
      id: string().required(),
      quantity: number().required(),
    }),
  ).required(),
});

export default class SalesController {
  public async create(request: Request, response: Response) {

    const { clientId, products, discount, observation } = await CreateSalesSchema.validate(request.body);
    const creteSaleService = container.resolve(CreateSaleService);
    const companyId = request.company.id;

    const newSale = await creteSaleService.execute({
      clientId,
      companyId,
      products,
      discount,
      observation,
    });

    return response.status(newSale.status).json(newSale);
  }

  public async getAll(request: Request, response: Response) {
    const { skip, createdAt, clientName, product } = request.query;
    const companyId = request.company.id;

    const getSaleService = container.resolve(GetSaleService);

    const sales = await getSaleService.execute(
      companyId,
      Number(skip || 0),
      createdAt && createdAt !== 'undefined' ? (createdAt as string) : undefined,
      clientName && clientName !== 'undefined' ? (clientName as string) : undefined,
      product && product !== 'undefined' ? (product as string) : undefined,
    );

    return response.status(sales.status).json(sales);
  }
}
