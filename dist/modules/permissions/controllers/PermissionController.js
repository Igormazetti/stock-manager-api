"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const GetPermissions_service_1 = __importDefault(require("../services/GetPermissions.service"));
class PermissionController {
    async getAll(_request, response) {
        const service = tsyringe_1.container.resolve(GetPermissions_service_1.default);
        const result = await service.execute();
        return response.status(result.status).json(result);
    }
}
exports.default = PermissionController;
//# sourceMappingURL=PermissionController.js.map