"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CompanyRepository_1 = __importDefault(require("../repository/CompanyRepository"));
const hash_1 = __importDefault(require("../../../utils/hash"));
class ResetPasswordService {
    constructor() {
        this.companyRepository = new CompanyRepository_1.default();
        this.encrypt = new hash_1.default();
    }
    async execute(companyId, oldPassword, newPassword) {
        const company = await this.companyRepository.findById(companyId);
        if (!company) {
            return {
                status: 404,
                errorMessage: 'Empresa não encontrada!',
            };
        }
        const checkHash = this.encrypt.checkPassword(oldPassword, company.password);
        if (!checkHash) {
            return {
                status: 401,
                errorMessage: 'Senha atual inválida!',
            };
        }
        const encryptedPassword = this.encrypt.encryptPassword(newPassword);
        await this.companyRepository.updateCompany(companyId, {
            password: encryptedPassword,
        });
        return {
            status: 200,
            message: 'Senha atualizada com sucesso!',
        };
    }
}
exports.default = ResetPasswordService;
//# sourceMappingURL=ResetPassword.service.js.map