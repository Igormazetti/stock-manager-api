"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmployeeRepository_1 = __importDefault(require("../repository/EmployeeRepository"));
class DeleteEmployeeService {
    employeeRepository;
    constructor() {
        this.employeeRepository = new EmployeeRepository_1.default();
    }
    async execute(id, companyId) {
        const existingEmployee = await this.employeeRepository.getById(id);
        if (!existingEmployee) {
            return {
                status: 404,
                errorMessage: 'Funcionário não encontrado',
            };
        }
        // Verificar se o funcionário pertence à empresa
        if (existingEmployee.companyId !== companyId) {
            return {
                status: 403,
                errorMessage: 'Sem permissão para excluir este funcionário',
            };
        }
        await this.employeeRepository.delete(id);
        return {
            status: 200,
            message: 'Funcionário excluído com sucesso',
        };
    }
}
exports.default = DeleteEmployeeService;
//# sourceMappingURL=DeleteEmployee.service.js.map