"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const yup_1 = require("yup");
const CreateRole_service_1 = __importDefault(require("../services/CreateRole.service"));
const DeleteRole_service_1 = __importDefault(require("../services/DeleteRole.service"));
const GetRoles_service_1 = __importDefault(require("../services/GetRoles.service"));
const UpdateRole_service_1 = __importDefault(require("../services/UpdateRole.service"));
const CreateRoleSchema = (0, yup_1.object)({
    name: (0, yup_1.string)().required(),
    description: (0, yup_1.string)().optional(),
    permissionIds: (0, yup_1.array)().of((0, yup_1.number)().required()).required(),
});
const UpdateRoleSchema = (0, yup_1.object)({
    name: (0, yup_1.string)().optional(),
    description: (0, yup_1.string)().optional(),
    permissionIds: (0, yup_1.array)().of((0, yup_1.number)().required()).optional(),
});
class RoleController {
    async getAll(request, response) {
        const { companyId } = request.user;
        const service = tsyringe_1.container.resolve(GetRoles_service_1.default);
        const result = await service.execute(companyId);
        return response.status(result.status).json(result);
    }
    async create(request, response) {
        const { companyId } = request.user;
        const data = await CreateRoleSchema.validate(request.body);
        const service = tsyringe_1.container.resolve(CreateRole_service_1.default);
        const result = await service.execute(companyId, data);
        return response.status(result.status).json(result);
    }
    async update(request, response) {
        const { companyId } = request.user;
        const { id } = request.params;
        const data = await UpdateRoleSchema.validate(request.body);
        const service = tsyringe_1.container.resolve(UpdateRole_service_1.default);
        const result = await service.execute(id, companyId, data);
        return response.status(result.status).json(result);
    }
    async delete(request, response) {
        const { companyId } = request.user;
        const { id } = request.params;
        const service = tsyringe_1.container.resolve(DeleteRole_service_1.default);
        const result = await service.execute(id, companyId);
        return response.status(result.status).json(result);
    }
}
exports.default = RoleController;
//# sourceMappingURL=RoleController.js.map