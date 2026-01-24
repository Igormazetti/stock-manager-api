"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-lines-per-function */
const ProductRepository_1 = __importDefault(require("modules/products/repository/ProductRepository"));
const SalesRepository_1 = __importDefault(require("../repository/SalesRepository"));
const CreateNotification_service_1 = __importDefault(require("modules/notifications/services/CreateNotification.service"));
class CreateSaleService {
    constructor() {
        this.salesRepository = new SalesRepository_1.default();
        this.productsRepository = new ProductRepository_1.default();
        this.createNotificationService = new CreateNotification_service_1.default();
    }
    async execute({ clientId, companyId, products, observation, paid, paymentTime }) {
        try {
            const productsToNotify = [];
            await Promise.all(products.map(async (product) => {
                const stock = await this.productsRepository.getProductById(product.id);
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
            }));
            await this.salesRepository.createSale({
                clientId,
                companyId,
                products,
                observation,
                paid,
                paymentTime,
            });
            for (const product of productsToNotify) {
                if (product.quantity === 0) {
                    await this.createNotificationService.execute({
                        companyId,
                        entity: 'PRODUCTS',
                        description: `Produto ${product.title} saiu do estoque`,
                        productName: product.title,
                    });
                }
                else if (product.quantity < 5) {
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
        }
        catch (err) {
            return {
                status: 400,
                errorMessage: 'Falha ao efetuar venda',
            };
        }
    }
}
exports.default = CreateSaleService;
//# sourceMappingURL=CreateSale.service.js.map