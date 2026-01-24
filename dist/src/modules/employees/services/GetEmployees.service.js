"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmployeeRepository_1 = __importDefault(require("../repository/EmployeeRepository"));
class GetEmployeeService {
    constructor() {
        this.employeeRepository = new EmployeeRepository_1.default();
    }
    async execute({ companyId, active }) {
        const employees = await this.employeeRepository.getByCompanyId(companyId, active);
        return {
            status: 200,
            employees: employees.map((emp) => ({
                id: emp.id,
                name: emp.name,
                email: emp.email,
                active: emp.active,
                createdAt: emp.createdAt,
                role: {
                    id: emp.Role.id,
                    name: emp.Role.name,
                },
            })),
        };
    }
}
exports.default = GetEmployeeService;
//# sourceMappingURL=GetEmployees.service.js.map