"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const yup_1 = require("yup");
const CreateProduct_service_1 = __importDefault(require("../services/CreateProduct.service"));
const UpdateProduct_service_1 = __importDefault(require("../services/UpdateProduct.service"));
// eslint-disable-next-line max-len
const GetProductsByCompanyId_service_1 = __importDefault(require("../services/GetProductsByCompanyId.service"));
const CreateProductSchema = (0, yup_1.object)({
    title: (0, yup_1.string)().required(),
    code: (0, yup_1.string)().optional(),
    value: (0, yup_1.number)().required(),
    originalValue: (0, yup_1.number)().required(),
    description: (0, yup_1.string)().required(),
    imgUrl: (0, yup_1.string)(),
    companyId: (0, yup_1.string)().required(),
    quantity: (0, yup_1.number)().required(),
});
const UpdateProductSchema = (0, yup_1.object)({
    title: (0, yup_1.string)(),
    code: (0, yup_1.string)().optional(),
    value: (0, yup_1.number)(),
    originalValue: (0, yup_1.number)(),
    description: (0, yup_1.string)(),
    imgUrl: (0, yup_1.string)(),
    companyId: (0, yup_1.string)(),
    quantity: (0, yup_1.number)(),
});
class ProductController {
    async create(request, response) {
        // eslint-disable-next-line max-len
        const { title, code, value, originalValue, description, imgUrl, quantity } = await CreateProductSchema.validate(request.body);
        const creteProductService = tsyringe_1.container.resolve(CreateProduct_service_1.default);
        const companyId = request.company.id;
        const product = await creteProductService.execute({
            title,
            code,
            value,
            originalValue,
            description,
            imgUrl,
            companyId,
            quantity,
        });
        return response.status(product.status).json(product);
    }
    async getProductByCompanyId(request, response) {
        const { skip, name, order } = request.query;
        const companyId = request.company.id;
        const getProductsByCompanyIdService = tsyringe_1.container.resolve(GetProductsByCompanyId_service_1.default);
        const products = await getProductsByCompanyIdService.execute(companyId, Number(skip), name || undefined, order || undefined);
        return response.status(products.status).json(products);
    }
    async update(request, response) {
        const { id } = request.params;
        const { title, code, value, originalValue, description, imgUrl, quantity } = await UpdateProductSchema.validate(request.body);
        const updateProductService = tsyringe_1.container.resolve(UpdateProduct_service_1.default);
        const update = await updateProductService.execute({
            productId: id,
            title,
            code,
            value,
            originalValue,
            description,
            imgUrl,
            quantity,
        });
        return response.status(update.status).json(update);
    }
}
exports.default = ProductController;
//# sourceMappingURL=ProductController.js.map