"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientRepository_1 = __importDefault(require("../repository/ClientRepository"));
const CompanyRepository_1 = __importDefault(require("../../companies/repository/CompanyRepository"));
class GetClientsByCompanyIdService {
    constructor() {
        this.clientRepository = new ClientRepository_1.default();
        this.companyRepository = new CompanyRepository_1.default();
    }
    async execute(companyId, skip, name) {
        const existingCompany = await this.companyRepository.findById(companyId);
        const take = 10;
        if (!existingCompany) {
            return {
                status: 404,
                errorMessage: 'Empresa não encontrada!',
            };
        }
        const clients = await this.clientRepository.getClientsByCompanyId(companyId, skip, take, name);
        const pages = Math.ceil(clients.totalCount / take);
        return {
            status: 200,
            clients: clients.clients,
            pages,
        };
    }
}
exports.default = GetClientsByCompanyIdService;
//# sourceMappingURL=GetClientsByCompanyId.service.js.map