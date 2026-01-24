"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../../database/prismaClient");
const hash_1 = __importDefault(require("../../../utils/hash"));
const CompanyRepository_1 = __importDefault(require("../repository/CompanyRepository"));
class CreateCompanyService {
    constructor() {
        this.companyRepository = new CompanyRepository_1.default();
        this.encrypt = new hash_1.default();
    }
    async execute(name, email, password) {
        const hashPassword = this.encrypt.encryptPassword(password);
        const existingCompany = await this.companyRepository.findByEmail(email);
        if (existingCompany) {
            return {
                status: 422,
                errorMessage: 'E-mail já cadastrado!',
            };
        }
        // Buscar a role Admin global
        const adminRole = await prismaClient_1.prisma.role.findFirst({
            where: { name: 'Admin', companyId: null },
        });
        const company = await this.companyRepository.createCompany({
            name,
            email,
            password: hashPassword,
            defaultRoleId: adminRole?.id,
        });
        return {
            id: company.id,
            status: 200,
            name: company.name,
            email: company.email,
        };
    }
}
exports.default = CreateCompanyService;
//# sourceMappingURL=CreateCompanyService.service.js.map