import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductsService from '../services/CreateProduct.service';

export default class ProductController {
  public async create(request: Request, response: Response) {
    const { title, value, description, imgUrl, companyId } = request.body;
    const creteProductService = container.resolve(CreateProductsService);

    const product = await creteProductService.execute(
      title,
      value,
      description,
      imgUrl,
      companyId,
    );

    return response.status(200).json(product);
  }
}
