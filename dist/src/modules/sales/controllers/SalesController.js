"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const yup_1 = require("yup");
const CreateSale_service_1 = __importDefault(require("../services/CreateSale.service"));
const GetSales_service_1 = __importDefault(require("../services/GetSales.service"));
const UpdateSale_service_1 = __importDefault(require("../services/UpdateSale.service"));
const CreateSalesSchema = (0, yup_1.object)({
    clientId: (0, yup_1.string)().required(),
    observation: (0, yup_1.string)().optional(),
    paid: (0, yup_1.boolean)().optional(),
    paymentTime: (0, yup_1.date)().optional().nullable(),
    products: (0, yup_1.array)((0, yup_1.object)({
        id: (0, yup_1.string)().required(),
        quantity: (0, yup_1.number)().required(),
        productSaleValue: (0, yup_1.number)().required(),
    })).required(),
});
const UpdateSaleSchema = (0, yup_1.object)({
    paid: (0, yup_1.boolean)().optional(),
    paymentTime: (0, yup_1.date)().optional().nullable(),
});
class SalesController {
    async create(request, response) {
        const { clientId, products, observation, paid, paymentTime } = await CreateSalesSchema.validate(request.body);
        const creteSaleService = tsyringe_1.container.resolve(CreateSale_service_1.default);
        const companyId = request.company.id;
        const newSale = await creteSaleService.execute({
            clientId,
            companyId,
            products,
            observation,
            paid: paid || false,
            paymentTime,
        });
        return response.status(newSale.status).json(newSale);
    }
    async getAll(request, response) {
        const { skip, createdAt, clientName, product, paid, paymentTimeStart, paymentTimeEnd } = request.query;
        const companyId = request.company.id;
        const getSaleService = tsyringe_1.container.resolve(GetSales_service_1.default);
        const sales = await getSaleService.execute(companyId, Number(skip || 0), createdAt && createdAt !== 'undefined' ? createdAt : undefined, clientName && clientName !== 'undefined' ? clientName : undefined, product && product !== 'undefined' ? product : undefined, paid !== undefined && paid !== 'undefined' ? paid === 'true' : undefined, paymentTimeStart && paymentTimeStart !== 'undefined' ? paymentTimeStart : undefined, paymentTimeEnd && paymentTimeEnd !== 'undefined' ? paymentTimeEnd : undefined);
        return response.status(sales.status).json(sales);
    }
    async update(request, response) {
        const { id } = request.params;
        const { paid, paymentTime } = await UpdateSaleSchema.validate(request.body);
        const companyId = request.company.id;
        const updateSaleService = tsyringe_1.container.resolve(UpdateSale_service_1.default);
        const result = await updateSaleService.execute(id, companyId, {
            paid,
            paymentTime,
        });
        return response.status(result.status).json(result);
    }
}
exports.default = SalesController;
//# sourceMappingURL=SalesController.js.map