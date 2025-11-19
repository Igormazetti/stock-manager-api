/* eslint-disable max-lines-per-function */
import ProductRepository from 'modules/products/repository/ProductRepository';
import SalesRepository from '../repository/SalesRepository';
import CreateNotificationService from 'modules/notifications/services/CreateNotification.service';
import { SalesPayload } from '../types';

export default class CreateSaleService {
  private salesRepository: SalesRepository;
  private productsRepository: ProductRepository;
  private createNotificationService: CreateNotificationService;

  constructor() {
    this.salesRepository = new SalesRepository();
    this.productsRepository = new ProductRepository();
    this.createNotificationService = new CreateNotificationService();
  }

  public async execute({ clientId, companyId, products, discount, observation, paid, paymentTime }: SalesPayload) {
    try {
      // Track updated products for notifications
      const productsToNotify: Array<{ id: string; title: string; quantity: number }> = [];

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

          const newQuantity = stock.quantity - product.quantity;
          await this.productsRepository.updateProduct(product.id, {
            quantity: newQuantity,
          });

          // Track product for notification
          productsToNotify.push({
            id: product.id,
            title: stock.title,
            quantity: newQuantity,
          });
        }),
      );

      await this.salesRepository.createSale({
        clientId,
        companyId,
        products,
        discount,
        observation,
        paid,
        paymentTime,
      });

      // Create notifications for products with low stock or out of stock
      for (const product of productsToNotify) {
        if (product.quantity === 0) {
          await this.createNotificationService.execute({
            companyId,
            entity: 'PRODUCTS',
            description: `Produto ${product.title} saiu do estoque`,
            productName: product.title,
          });
        } else if (product.quantity < 5) {
          await this.createNotificationService.execute({
            companyId,
            entity: 'PRODUCTS',
            description: `Produto ${product.title} está com estoque baixo (${product.quantity} unidades)`,
            productName: product.title,
          });
        }
      }

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
