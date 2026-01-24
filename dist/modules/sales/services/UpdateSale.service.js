"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SalesRepository_1 = __importDefault(require("../repository/SalesRepository"));
class UpdateSaleService {
    salesRepository;
    constructor() {
        this.salesRepository = new SalesRepository_1.default();
    }
    async execute(saleId, companyId, { paid, paymentTime }) {
        try {
            const sale = await this.salesRepository.getSaleById(saleId, companyId);
            if (!sale) {
                return {
                    status: 404,
                    errorMessage: 'Venda não encontrada',
                };
            }
            await this.salesRepository.updateSale(saleId, {
                paid,
                paymentTime,
            });
            return {
                status: 200,
            };
        }
        catch (err) {
            return {
                status: 400,
                errorMessage: 'Falha ao atualizar venda',
            };
        }
    }
}
exports.default = UpdateSaleService;
//# sourceMappingURL=UpdateSale.service.js.map