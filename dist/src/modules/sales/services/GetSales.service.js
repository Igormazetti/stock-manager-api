"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CompanyRepository_1 = __importDefault(require("modules/companies/repository/CompanyRepository"));
const SalesRepository_1 = __importDefault(require("../repository/SalesRepository"));
class GetSaleService {
    constructor() {
        this.companyRepository = new CompanyRepository_1.default();
        this.salesRepository = new SalesRepository_1.default();
    }
    async execute(companyId, skip, createdAt, clientName, product, paid, paymentTimeStart, paymentTimeEnd) {
        const existingCompany = await this.companyRepository.findById(companyId);
        const take = 30;
        if (!existingCompany) {
            return {
                status: 404,
                errorMessage: 'Empresa não encontrada',
            };
        }
        const sales = await this.salesRepository.getSales(companyId, skip, take, createdAt, clientName, product, paid, paymentTimeStart, paymentTimeEnd);
        const pages = Math.ceil(sales.totalCount / take);
        const formatedSales = sales.sales.map((sale) => {
            const totalValue = sale.Products.reduce((acc, item) => acc + item.quantity_sold * item.productSaleValue, 0);
            return { ...sale, totalValue };
        });
        return {
            status: 200,
            sales: formatedSales,
            pages,
        };
    }
}
exports.default = GetSaleService;
//# sourceMappingURL=GetSales.service.js.map