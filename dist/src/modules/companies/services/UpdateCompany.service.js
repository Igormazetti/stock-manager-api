"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CompanyRepository_1 = __importDefault(require("../repository/CompanyRepository"));
class UpdateCompanyService {
    constructor() {
        this.companyRepository = new CompanyRepository_1.default();
    }
    async execute(companyId, data) {
        const company = await this.companyRepository.findById(companyId);
        if (!company) {
            return {
                status: 404,
                errorMessage: 'Empresa não encontrada!',
            };
        }
        // Check if new email is unique (only if email is being updated)
        if (data.email && data.email !== company.email) {
            const emailExists = await this.companyRepository.findByEmail(data.email);
            if (emailExists) {
                return {
                    status: 422,
                    errorMessage: 'Email já está registrado!',
                };
            }
        }
        const updatedCompany = await this.companyRepository.updateCompany(companyId, data);
        return {
            status: 200,
            company: {
                id: updatedCompany.id,
                name: updatedCompany.name,
                email: updatedCompany.email,
                logoUrl: updatedCompany.logoUrl,
                valid: updatedCompany.valid,
                cnpj: updatedCompany.cnpj,
                address: updatedCompany.address,
                phone: updatedCompany.phone,
                cep: updatedCompany.cep,
                city: updatedCompany.city,
                state: updatedCompany.state,
            },
        };
    }
}
exports.default = UpdateCompanyService;
//# sourceMappingURL=UpdateCompany.service.js.map