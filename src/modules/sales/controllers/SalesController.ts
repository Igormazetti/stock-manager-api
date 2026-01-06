import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { object, string, array, number, boolean, date } from 'yup';
import CreateSaleService from '../services/CreateSale.service';
import GetSaleService from '../services/GetSales.service';
import UpdateSaleService from '../services/UpdateSale.service';

const CreateSalesSchema = object({
  clientId: string().required(),
  observation: string().optional(),
  paid: boolean().optional(),
  paymentTime: date().optional().nullable(),
  products: array(
    object({
      id: string().required(),
      quantity: number().required(),
      productSaleValue: number().required(),
    }),
  ).required(),
});

const UpdateSaleSchema = object({
  paid: boolean().optional(),
  paymentTime: date().optional().nullable(),
});

export default class SalesController {
  public async create(request: Request, response: Response) {

    const { clientId, products, observation, paid, paymentTime } = await CreateSalesSchema.validate(request.body);
    const creteSaleService = container.resolve(CreateSaleService);
    const companyId = request.company.id;

    const newSale = await creteSaleService.execute({
      clientId,
      companyId,
      products,
      observation,
      paid: paid || false,
      paymentTime,
    });

    return response.status(newSale.status).json(newSale);
  }

  public async getAll(request: Request, response: Response) {
    const { skip, createdAt, clientName, product, paid, paymentTimeStart, paymentTimeEnd } = request.query;
    const companyId = request.company.id;

    const getSaleService = container.resolve(GetSaleService);

    const sales = await getSaleService.execute(
      companyId,
      Number(skip || 0),
      createdAt && createdAt !== 'undefined' ? (createdAt as string) : undefined,
      clientName && clientName !== 'undefined' ? (clientName as string) : undefined,
      product && product !== 'undefined' ? (product as string) : undefined,
      paid !== undefined && paid !== 'undefined' ? paid === 'true' : undefined,
      paymentTimeStart && paymentTimeStart !== 'undefined' ? (paymentTimeStart as string) : undefined,
      paymentTimeEnd && paymentTimeEnd !== 'undefined' ? (paymentTimeEnd as string) : undefined,
    );

    return response.status(sales.status).json(sales);
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { paid, paymentTime } = await UpdateSaleSchema.validate(request.body);
    const companyId = request.company.id;

    const updateSaleService = container.resolve(UpdateSaleService);

    const result = await updateSaleService.execute(id, companyId, {
      paid,
      paymentTime,
    });

    return response.status(result.status).json(result);
  }
}
