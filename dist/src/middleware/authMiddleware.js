"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const CustomError_1 = require("common/error/CustomError");
const prismaClient_1 = require("../database/prismaClient");
const jwt_1 = __importDefault(require("../utils/jwt"));
async function getPermissionsForCompany(companyId) {
    const company = await prismaClient_1.prisma.company.findUnique({
        where: { id: companyId },
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
    if (!company?.DefaultRole) {
        return [];
    }
    return company.DefaultRole.permissions.map((rp) => rp.Permission.permission);
}
async function getPermissionsForEmployee(employeeId) {
    const employee = await prismaClient_1.prisma.employee.findUnique({
        where: { id: employeeId },
        include: {
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
    if (!employee?.Role) {
        return [];
    }
    return employee.Role.permissions.map((rp) => rp.Permission.permission);
}
const authMiddleware = async (req, _res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            throw new CustomError_1.CustomError('Invalid token format', 401);
        }
        const token = authorizationHeader.split(' ')[1];
        const tokenInstance = new jwt_1.default();
        // Tentar novo formato de token primeiro
        const newDecoded = tokenInstance.validateUserToken(token);
        if (newDecoded) {
            let permissions = [];
            if (newDecoded.type === 'company') {
                permissions = await getPermissionsForCompany(newDecoded.companyId);
            }
            else {
                permissions = await getPermissionsForEmployee(newDecoded.id);
            }
            req.user = {
                id: newDecoded.id,
                type: newDecoded.type,
                companyId: newDecoded.companyId,
                permissions,
            };
            // Manter compatibilidade com código legado
            req.company = {
                id: newDecoded.companyId,
            };
            return next();
        }
        // Fallback para formato legado (apenas company id)
        const legacyDecoded = tokenInstance.validateToken(token);
        if (legacyDecoded) {
            const permissions = await getPermissionsForCompany(legacyDecoded);
            req.company = {
                id: legacyDecoded,
            };
            req.user = {
                id: legacyDecoded,
                type: 'company',
                companyId: legacyDecoded,
                permissions,
            };
            return next();
        }
        throw new CustomError_1.CustomError('Invalid token', 401);
    }
    catch (error) {
        if (error instanceof CustomError_1.CustomError) {
            throw error;
        }
        throw new CustomError_1.CustomError('Authentication failed', 401);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map