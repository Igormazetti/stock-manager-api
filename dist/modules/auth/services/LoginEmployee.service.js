"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../../database/prismaClient");
const hash_1 = require("../../../utils/hash");
const jwt_1 = __importDefault(require("../../../utils/jwt"));
class LoginEmployeeService {
    async execute({ email, password }) {
        const employee = await prismaClient_1.prisma.employee.findUnique({
            where: { email },
            include: {
                Company: true,
                Role: {
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
        if (!employee) {
            return { status: 401, errorMessage: 'Email ou senha inválidos' };
        }
        if (!employee.active) {
            return { status: 401, errorMessage: 'Usuário desativado' };
        }
        const isValidPassword = await (0, hash_1.checkPassword)(password, employee.password);
        if (!isValidPassword) {
            return { status: 401, errorMessage: 'Email ou senha inválidos' };
        }
        const tokenInstance = new jwt_1.default();
        const token = tokenInstance.createUserToken({
            id: employee.id,
            type: 'employee',
            companyId: employee.companyId,
        });
        const permissions = employee.Role?.permissions.map((rp) => rp.Permission.permission) || [];
        return {
            status: 200,
            token,
            user: {
                id: employee.id,
                type: 'employee',
                name: employee.name,
                email: employee.email,
                companyId: employee.companyId,
                permissions,
            },
        };
    }
}
exports.default = LoginEmployeeService;
//# sourceMappingURL=LoginEmployee.service.js.map