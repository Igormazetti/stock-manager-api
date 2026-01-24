"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CompanyRepository_1 = __importDefault(require("../repository/CompanyRepository"));
const hash_1 = __importDefault(require("../../../utils/hash"));
const jwt_1 = __importDefault(require("../../../utils/jwt"));
class LoginService {
    constructor() {
        this.companyRepository = new CompanyRepository_1.default();
        this.encrypt = new hash_1.default();
    }
    async execute(email, password) {
        const company = await this.companyRepository.findByEmail(email);
        if (!company) {
            return {
                status: 404,
                errorMessage: 'Usuário não encontrado!',
            };
        }
        const checkHash = this.encrypt.checkPassword(password, company.password);
        if (!checkHash) {
            return {
                status: 401,
                errorMessage: 'Senha inválida!',
            };
        }
        const tokenInstance = new jwt_1.default();
        const token = tokenInstance.createToken(String(company.id));
        return {
            status: 200,
            company: {
                id: company.id,
                name: company.name,
                email: company.email,
                valid: company.valid,
            },
            token,
        };
    }
}
exports.default = LoginService;
//# sourceMappingURL=Login.service.js.map