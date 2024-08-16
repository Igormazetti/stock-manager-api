import ProductRepository from 'modules/products/repository/ProductRepository';
import SalesRepository from '../repository/SalesRepository';
import { SalesPayload } from '../types';

export default class CreateSaleService {
  private salesRepository: SalesRepository;
  private productsRepository: ProductRepository;

  constructor() {
    this.salesRepository = new SalesRepository();
    this.productsRepository = new ProductRepository();
  }

  public async execute({ client, companyId, products }: SalesPayload) {
    try {
      await Promise.all(
        products.map(async (product) => {
          const stock = await this.productsRepository.getProductById(
            product.id,
          );

          if (!stock) {
            return {
              status: 400,
              errorMessage: 'Produto não encontrado',
            };
          }

          if (stock.quantity < product.quantity) {
            return {
              status: 404,
              errorMessage: `Produto ${stock?.title} sem estoque suficiente`,
            };
          }

          await this.productsRepository.updateProduct(product.id, {
            quantity: stock.quantity - product.quantity,
          });
        }),
      );

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
