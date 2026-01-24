"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../../database/prismaClient");
class EmployeeRepository {
    db = prismaClient_1.prisma.employee;
    async create(data) {
        return this.db.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                roleId: data.roleId,
                companyId: data.companyId,
            },
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
    }
    async getByCompanyId(companyId, active) {
        return this.db.findMany({
            where: {
                companyId,
                ...(active !== undefined && { active }),
            },
            include: {
                Role: true,
            },
            orderBy: { name: 'asc' },
        });
    }
    async getById(id) {
        return this.db.findUnique({
            where: { id },
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
    }
    async getByEmail(email) {
        return this.db.findUnique({
            where: { email },
        });
    }
    async update(id, data) {
        return this.db.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.email && { email: data.email }),
                ...(data.password && { password: data.password }),
                ...(data.roleId && { roleId: data.roleId }),
                ...(data.active !== undefined && { active: data.active }),
            },
            include: {
                Role: true,
            },
        });
    }
    async delete(id) {
        return this.db.delete({
            where: { id },
        });
    }
}
exports.default = EmployeeRepository;
//# sourceMappingURL=EmployeeRepository.js.map