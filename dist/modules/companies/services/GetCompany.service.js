"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CompanyRepository_1 = __importDefault(require("../repository/CompanyRepository"));
class GetCompanyService {
    companyRepository;
    constructor() {
        this.companyRepository = new CompanyRepository_1.default();
    }
    async execute(companyId) {
        const company = await this.companyRepository.findById(companyId);
        if (!company) {
            return {
                status: 404,
                errorMessage: 'Empresa não encontrada!',
            };
        }
        return {
            status: 200,
            company: {
                id: company.id,
                name: company.name,
                email: company.email,
                logoUrl: company.logoUrl,
                valid: company.valid,
                cnpj: company.cnpj,
                address: company.address,
                phone: company.phone,
                cep: company.cep,
                city: company.city,
                state: company.state,
            },
        };
    }
}
exports.default = GetCompanyService;
//# sourceMappingURL=GetCompany.service.js.map