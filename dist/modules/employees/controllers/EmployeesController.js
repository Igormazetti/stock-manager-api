"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const yup_1 = require("yup");
const GetEmployees_service_1 = __importDefault(require("../services/GetEmployees.service"));
const CreateEmplyee_service_1 = __importDefault(require("../services/CreateEmplyee.service"));
const UpdateEmployee_service_1 = __importDefault(require("../services/UpdateEmployee.service"));
const DeleteEmployee_service_1 = __importDefault(require("../services/DeleteEmployee.service"));
const CreateEmployeeSchema = (0, yup_1.object)({
    name: (0, yup_1.string)().required(),
    email: (0, yup_1.string)().email().required(),
    password: (0, yup_1.string)().min(6).required(),
    roleId: (0, yup_1.string)().required(),
});
const UpdateEmployeeSchema = (0, yup_1.object)({
    name: (0, yup_1.string)(),
    email: (0, yup_1.string)().email(),
    password: (0, yup_1.string)().min(6),
    roleId: (0, yup_1.string)(),
    active: (0, yup_1.boolean)(),
});
const filterEmployees = (0, yup_1.object)({
    active: (0, yup_1.boolean)(),
});
class EmployeeController {
    async getEmployees(request, response) {
        const { companyId } = request.user;
        const { active } = await filterEmployees.validate(request.query);
        const getEmployeeService = tsyringe_1.container.resolve(GetEmployees_service_1.default);
        const employees = await getEmployeeService.execute({ companyId, active });
        return response.status(employees.status).json(employees);
    }
    async create(request, response) {
        const { companyId } = request.user;
        const data = await CreateEmployeeSchema.validate(request.body);
        const createEmployeeService = tsyringe_1.container.resolve(CreateEmplyee_service_1.default);
        const employee = await createEmployeeService.execute(data, companyId);
        return response.status(employee.status).json(employee);
    }
    async update(request, response) {
        const { companyId } = request.user;
        const { id } = request.params;
        const data = await UpdateEmployeeSchema.validate(request.body);
        const updateEmployeeService = tsyringe_1.container.resolve(UpdateEmployee_service_1.default);
        const result = await updateEmployeeService.execute(id, companyId, data);
        return response.status(result.status).json(result);
    }
    async delete(request, response) {
        const { companyId } = request.user;
        const { id } = request.params;
        const deleteEmployeeService = tsyringe_1.container.resolve(DeleteEmployee_service_1.default);
        const result = await deleteEmployeeService.execute(id, companyId);
        return response.status(result.status).json(result);
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=EmployeesController.js.map