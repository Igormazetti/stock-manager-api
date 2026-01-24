"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PermissionRepository_1 = __importDefault(require("../repository/PermissionRepository"));
class GetPermissionsService {
    permissionRepository;
    constructor() {
        this.permissionRepository = new PermissionRepository_1.default();
    }
    async execute() {
        const permissions = await this.permissionRepository.getAll();
        return {
            status: 200,
            permissions,
        };
    }
}
exports.default = GetPermissionsService;
//# sourceMappingURL=GetPermissions.service.js.map