"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../../database/prismaClient");
const hash_1 = require("../../../utils/hash");
const jwt_1 = __importDefault(require("../../../utils/jwt"));
class LoginCompanyService {
    async execute({ email, password }) {
        const company = await prismaClient_1.prisma.company.findUnique({
            where: { email },
            include: {
                DefaultRole: {
                    include: {
                        permissions: {
                            include: {
                                Permission: true,
                            },
                        },
                    },
                },
            },
        });
        if (!company) {
            return { status: 401, errorMessage: 'Email ou senha inválidos' };
        }
        const isValidPassword = await (0, hash_1.checkPassword)(password, company.password);
        if (!isValidPassword) {
            return { status: 401, errorMessage: 'Email ou senha inválidos' };
        }
        const tokenInstance = new jwt_1.default();
        const token = tokenInstance.createUserToken({
            id: company.id,
            type: 'company',
            companyId: company.id,
        });
        const permissions = company.DefaultRole?.permissions.map((rp) => rp.Permission.permission) || [];
        return {
            status: 200,
            token,
            user: {
                id: company.id,
                type: 'company',
                name: company.name,
                email: company.email,
                companyId: company.id,
                permissions,
            },
        };
    }
}
exports.default = LoginCompanyService;
//# sourceMappingURL=LoginCompany.service.js.map