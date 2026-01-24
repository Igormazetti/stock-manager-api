"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductRepository_1 = __importDefault(require("../repository/ProductRepository"));
class UpdateProductsService {
    constructor() {
        this.productRepository = new ProductRepository_1.default();
    }
    async execute({ productId, title, code, value, originalValue, description, imgUrl, quantity, }) {
        const product = await this.productRepository.getProductById(productId);
        if (!product) {
            return {
                status: 404,
                errorMessage: 'Produto não encontrado',
            };
        }
        await this.productRepository.updateProduct(productId, {
            title,
            code,
            value,
            originalValue,
            description,
            imgUrl,
            quantity,
        });
        return {
            status: 200,
        };
    }
}
exports.default = UpdateProductsService;
//# sourceMappingURL=UpdateProduct.service.js.map