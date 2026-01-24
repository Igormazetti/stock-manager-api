"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../../database/prismaClient");
class RoleRepository {
    constructor() {
        this.db = prismaClient_1.prisma.role;
    }
    async create(companyId, data) {
        const { name, description, permissionIds } = data;
        return this.db.create({
            data: {
                name,
                description,
                companyId,
                permissions: {
                    create: permissionIds.map((permissionId) => ({
                        permissionId,
                    })),
                },
            },
            include: {
                permissions: {
                    include: {
                        Permission: true,
                    },
                },
            },
        });
    }
    async getByCompanyId(companyId) {
        return this.db.findMany({
            where: {
                OR: [
                    { companyId: null }, // Roles globais (Admin)
                    { companyId }, // Roles customizadas da empresa
                ],
            },
            include: {
                permissions: {
                    include: {
                        Permission: true,
                    },
                },
            },
            orderBy: { name: 'asc' },
        });
    }
    async getById(id) {
        return this.db.findUnique({
            where: { id },
            include: {
                permissions: {
                    include: {
                        Permission: true,
                    },
                },
            },
        });
    }
    async getByNameAndCompanyId(name, companyId) {
        return this.db.findFirst({
            where: { name, companyId },
        });
    }
    async update(id, data) {
        const { name, description, permissionIds } = data;
        // Se permissionIds foi fornecido, atualizar as permissions
        if (permissionIds !== undefined) {
            // Deletar permissions existentes
            await prismaClient_1.prisma.rolePermission.deleteMany({
                where: { roleId: id },
            });
            // Criar novas permissions
            await prismaClient_1.prisma.rolePermission.createMany({
                data: permissionIds.map((permissionId) => ({
                    roleId: id,
                    permissionId,
                })),
            });
        }
        return this.db.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(description !== undefined && { description }),
            },
            include: {
                permissions: {
                    include: {
                        Permission: true,
                    },
                },
            },
        });
    }
    async delete(id) {
        return this.db.delete({
            where: { id },
        });
    }
    async hasEmployees(roleId) {
        const count = await prismaClient_1.prisma.employee.count({
            where: { roleId },
        });
        return count > 0;
    }
}
exports.default = RoleRepository;
//# sourceMappingURL=RoleRepository.js.map