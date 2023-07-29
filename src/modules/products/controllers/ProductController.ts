import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductsService from '../services/CreateProduct.service';
import GetProductsByCompanyIdService from '../services/GetProductsByCompanyId.service';

export default class ProductController {
  public async create(request: Request, response: Response) {
    const { title, value, description, imgUrl } = request.body;
    const creteProductService = container.resolve(CreateProductsService);
    const companyId = request.company.id;

    const product = await creteProductService.execute(
      title,
      value,
      description,
      imgUrl,
      companyId,
    );

    return response.status(200).json(product);
  }

  public async getProductByCompanyId(request: Request, response: Response) {
    const { skip, take } = request.query;
    const companyId = request.company.id;

    const getProductsByCompanyIdService = container.resolve(
      GetProductsByCompanyIdService,
    );
    const products = await getProductsByCompanyIdService.execute(
      companyId,
      Number(skip),
      Number(take),
    );

    return response.status(200).json(products);
  }
}
