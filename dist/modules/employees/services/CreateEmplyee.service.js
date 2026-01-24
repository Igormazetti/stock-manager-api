"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = __importDefault(require("../../../utils/hash"));
const EmployeeRepository_1 = __importDefault(require("../repository/EmployeeRepository"));
class CreateEmployeeService {
    employeeRepository;
    constructor() {
        this.employeeRepository = new EmployeeRepository_1.default();
    }
    async execute(data, companyId) {
        const existingEmployee = await this.employeeRepository.getByEmail(data.email);
        if (existingEmployee) {
            return {
                status: 400,
                errorMessage: 'Email já cadastrado',
            };
        }
        const encrypt = new hash_1.default();
        const hashedPassword = encrypt.encryptPassword(data.password);
        const employee = await this.employeeRepository.create({
            ...data,
            password: hashedPassword,
            companyId,
        });
        return {
            status: 201,
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
exports.default = CreateEmployeeService;
//# sourceMappingURL=CreateEmplyee.service.js.map