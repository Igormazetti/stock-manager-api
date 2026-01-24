"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductRepository_1 = __importDefault(require("../repository/ProductRepository"));
class GetProductsByIdService {
    productRepository;
    constructor() {
        this.productRepository = new ProductRepository_1.default();
    }
    async execute(productId) {
        const product = await this.productRepository.getProductById(productId);
        if (!product) {
            return {
                status: 404,
                errorMessage: 'Produto não encontrado',
            };
        }
        return {
            status: 200,
            product,
        };
    }
}
exports.default = GetProductsByIdService;
//# sourceMappingURL=GetProductById.service.js.map