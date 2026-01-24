"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../../database/prismaClient");
class PermissionRepository {
    db = prismaClient_1.prisma.permission;
    async getAll() {
        return this.db.findMany({
            orderBy: { permission: 'asc' },
        });
    }
    async getById(id) {
        return this.db.findUnique({
            where: { id },
        });
    }
    async getByPermission(permission) {
        return this.db.findUnique({
            where: { permission },
        });
    }
}
exports.default = PermissionRepository;
//# sourceMappingURL=PermissionRepository.js.map