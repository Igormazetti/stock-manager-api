"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = __importDefault(require("../../../utils/hash"));
const EmployeeRepository_1 = __importDefault(require("../repository/EmployeeRepository"));
class UpdateEmployeeService {
    employeeRepository;
    constructor() {
        this.employeeRepository = new EmployeeRepository_1.default();
    }
    async execute(id, companyId, data) {
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
                errorMessage: 'Sem permissão para editar este funcionário',
            };
        }
        // Verificar se o email já está em uso
        if (data.email && data.email !== existingEmployee.email) {
            const existingEmail = await this.employeeRepository.getByEmail(data.email);
            if (existingEmail) {
                return {
                    status: 400,
                    errorMessage: 'Email já cadastrado',
                };
            }
        }
        // Hash da senha se foi fornecida
        let updateData = { ...data };
        if (data.password) {
            const encrypt = new hash_1.default();
            updateData.password = encrypt.encryptPassword(data.password);
        }
        const employee = await this.employeeRepository.update(id, updateData);
        return {
            status: 200,
            employee: {
                id: employee.id,
                name: employee.name,
                email: employee.email,
                active: employee.active,
                role: {
                    id: employee.Role.id,
                    name: employee.Role.name,
                },
            },
        };
    }
}
exports.default = UpdateEmployeeService;
//# sourceMappingURL=UpdateEmployee.service.js.map