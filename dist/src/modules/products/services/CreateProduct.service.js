"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductRepository_1 = __importDefault(require("../repository/ProductRepository"));
class CreateProductsService {
    constructor() {
        this.productRepository = new ProductRepository_1.default();
    }
    async execute({ title, code, value, originalValue, description, imgUrl, companyId, quantity, }) {
        const product = await this.productRepository.getProductByName(companyId, title);
        if (product) {
            return {
                status: 422,
                errorMessage: 'Já existe produto cadastrado com este nome',
            };
        }
        await this.productRepository.createProduct({
            title,
            code,
            value,
            originalValue,
            description,
            imgUrl,
            companyId,
            quantity,
        });
        return {
            status: 200,
        };
    }
}
exports.default = CreateProductsService;
//# sourceMappingURL=CreateProduct.service.js.map