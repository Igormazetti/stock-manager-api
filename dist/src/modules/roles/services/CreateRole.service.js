"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoleRepository_1 = __importDefault(require("../repository/RoleRepository"));
class CreateRoleService {
    constructor() {
        this.roleRepository = new RoleRepository_1.default();
    }
    async execute(companyId, data) {
        // Verificar se já existe uma role com esse nome para essa empresa
        const existingRole = await this.roleRepository.getByNameAndCompanyId(data.name, companyId);
        if (existingRole) {
            return {
                status: 400,
                errorMessage: 'Já existe uma role com esse nome',
            };
        }
        const role = await this.roleRepository.create(companyId, data);
        return {
            status: 201,
            role: {
                id: role.id,
                name: role.name,
                description: role.description,
                permissions: role.permissions.map((rp) => ({
                    id: rp.Permission.id,
                    permission: rp.Permission.permission,
                    description: rp.Permission.description,
                })),
            },
        };
    }
}
exports.default = CreateRoleService;
//# sourceMappingURL=CreateRole.service.js.map