"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductRepository_1 = __importDefault(require("../repository/ProductRepository"));
const CompanyRepository_1 = __importDefault(require("../../companies/repository/CompanyRepository"));
class GetProductsByCompanyIdService {
    productRepository;
    companyRepository;
    constructor() {
        this.productRepository = new ProductRepository_1.default();
        this.companyRepository = new CompanyRepository_1.default();
    }
    async execute(companyId, skip, name, order) {
        const existingCompany = await this.companyRepository.findById(companyId);
        const take = 8;
        if (!existingCompany) {
            return {
                status: 404,
                errorMessage: 'Empresa não encontrada!',
            };
        }
        const outOfStock = order === 'sem' ? true : false;
        const orderBy = order === 'sem' ? undefined : order;
        const products = await this.productRepository.getProductsByCompanyId(companyId, skip, take, name, orderBy, outOfStock);
        const pages = Math.ceil(products.totalCount / take);
        return {
            status: 200,
            products: products.products,
            pages,
        };
    }
}
exports.default = GetProductsByCompanyIdService;
//# sourceMappingURL=GetProductsByCompanyId.service.js.map