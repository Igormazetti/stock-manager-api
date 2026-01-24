"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const CreateCompanyService_service_1 = __importDefault(require("../services/CreateCompanyService.service"));
const Login_service_1 = __importDefault(require("../services/Login.service"));
const ResetPassword_service_1 = __importDefault(require("../services/ResetPassword.service"));
const UpdateCompany_service_1 = __importDefault(require("../services/UpdateCompany.service"));
const GetCompany_service_1 = __importDefault(require("../services/GetCompany.service"));
class CompanyController {
    async create(request, response) {
        const { name, email, password } = request.body;
        const creteCompanyService = tsyringe_1.container.resolve(CreateCompanyService_service_1.default);
        const company = await creteCompanyService.execute(name, email, password);
        return response.status(company.status).json(company);
    }
    async login(request, response) {
        const { email, password } = request.body;
        const loginService = tsyringe_1.container.resolve(Login_service_1.default);
        const session = await loginService.execute(email, password);
        return response.status(session.status).json(session);
    }
    async resetPassword(request, response) {
        const { oldPassword, newPassword } = request.body;
        const companyId = request.company.id;
        const resetPasswordService = tsyringe_1.container.resolve(ResetPassword_service_1.default);
        const result = await resetPasswordService.execute(companyId, oldPassword, newPassword);
        return response.status(result.status).json(result);
    }
    async update(request, response) {
        const { name, email, logoUrl, cnpj, address, phone, cep, city, state } = request.body;
        const companyId = request.company.id;
        const updateCompanyService = tsyringe_1.container.resolve(UpdateCompany_service_1.default);
        const result = await updateCompanyService.execute(companyId, {
            name,
            email,
            logoUrl,
            cnpj,
            address,
            phone,
            cep,
            city,
            state,
        });
        return response.status(result.status).json(result);
    }
    async get(request, response) {
        const companyId = request.company.id;
        const getCompanyService = tsyringe_1.container.resolve(GetCompany_service_1.default);
        const result = await getCompanyService.execute(companyId);
        return response.status(result.status).json(result);
    }
}
exports.default = CompanyController;
//# sourceMappingURL=CompanyController.js.map