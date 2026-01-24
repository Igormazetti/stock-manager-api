"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoleRepository_1 = __importDefault(require("../repository/RoleRepository"));
class DeleteRoleService {
    constructor() {
        this.roleRepository = new RoleRepository_1.default();
    }
    async execute(roleId, companyId) {
        const role = await this.roleRepository.getById(roleId);
        if (!role) {
            return {
                status: 404,
                errorMessage: 'Role não encontrada',
            };
        }
        // Não permitir deletar roles globais (Admin)
        if (role.companyId === null) {
            return {
                status: 403,
                errorMessage: 'Não é possível excluir roles globais',
            };
        }
        // Verificar se a role pertence à empresa
        if (role.companyId !== companyId) {
            return {
                status: 403,
                errorMessage: 'Sem permissão para excluir esta role',
            };
        }
        // Verificar se há funcionários usando esta role
        const hasEmployees = await this.roleRepository.hasEmployees(roleId);
        if (hasEmployees) {
            return {
                status: 400,
                errorMessage: 'Não é possível excluir uma role que possui funcionários vinculados',
            };
        }
        await this.roleRepository.delete(roleId);
        return {
            status: 200,
            message: 'Role excluída com sucesso',
        };
    }
}
exports.default = DeleteRoleService;
//# sourceMappingURL=DeleteRole.service.js.map