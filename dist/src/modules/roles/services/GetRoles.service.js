"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoleRepository_1 = __importDefault(require("../repository/RoleRepository"));
class GetRolesService {
    constructor() {
        this.roleRepository = new RoleRepository_1.default();
    }
    async execute(companyId) {
        const roles = await this.roleRepository.getByCompanyId(companyId);
        return {
            status: 200,
            roles: roles.map((role) => ({
                id: role.id,
                name: role.name,
                description: role.description,
                isGlobal: role.companyId === null,
                permissions: role.permissions.map((rp) => ({
                    id: rp.Permission.id,
                    permission: rp.Permission.permission,
                    description: rp.Permission.description,
                })),
            })),
        };
    }
}
exports.default = GetRolesService;
//# sourceMappingURL=GetRoles.service.js.map