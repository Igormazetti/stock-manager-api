/* eslint-disable operator-linebreak */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { object, string, number } from 'yup';
import CreateProductsService from '../services/CreateProduct.service';
import UpdateProductsService from '../services/UpdateProduct.service';
// eslint-disable-next-line max-len
import GetProductsByCompanyIdService from '../services/GetProductsByCompanyId.service';

const CreateProductSchema = object({
  title: string().required(),
  value: number().required(),
  description: string().required(),
  imgUrl: string(),
  companyId: string().required(),
  quantity: number().required(),
});

const UpdateProductSchema = object({
  title: string(),
  value: number(),
  description: string(),
  imgUrl: string(),
  companyId: string(),
  quantity: number(),
});

export default class ProductController {
  public async create(request: Request, response: Response) {
    // eslint-disable-next-line max-len
    const { title, value, description, imgUrl, quantity } =
      await CreateProductSchema.validate(request.body);
    const creteProductService = container.resolve(CreateProductsService);
    const companyId = request.company.id;

    const product = await creteProductService.execute({
      title,
      value,
      description,
      imgUrl,
      companyId,
      quantity,
    });

    return response.status(product.status).json(product);
  }

  public async getProductByCompanyId(request: Request, response: Response) {
    const { skip, name, order } = request.query;
    const companyId = request.company.id;

    const getProductsByCompanyIdService = container.resolve(
      GetProductsByCompanyIdService,
    );
    const products = await getProductsByCompanyIdService.execute(
      companyId,
      Number(skip),
      name as string || undefined,
      order as string || undefined,
    );

    return response.status(products.status).json(products);
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;

    const { title, value, description, imgUrl, quantity } =
      await UpdateProductSchema.validate(request.body);
    const updateProductService = container.resolve(UpdateProductsService);

    const update = await updateProductService.execute({
      productId: id,
      title,
      value,
      description,
      imgUrl,
      quantity,
    });

    return response.status(update.status).json(update);
  }
}
