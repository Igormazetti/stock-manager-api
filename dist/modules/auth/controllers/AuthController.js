"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const yup_1 = require("yup");
const LoginCompany_service_1 = __importDefault(require("../services/LoginCompany.service"));
const LoginEmployee_service_1 = __importDefault(require("../services/LoginEmployee.service"));
const LoginSchema = (0, yup_1.object)({
    email: (0, yup_1.string)().email().required(),
    password: (0, yup_1.string)().required(),
});
class AuthController {
    async loginCompany(request, response) {
        const { email, password } = await LoginSchema.validate(request.body);
        const loginService = tsyringe_1.container.resolve(LoginCompany_service_1.default);
        const result = await loginService.execute({ email, password });
        return response.status(result.status).json(result);
    }
    async loginEmployee(request, response) {
        const { email, password } = await LoginSchema.validate(request.body);
        const loginService = tsyringe_1.container.resolve(LoginEmployee_service_1.default);
        const result = await loginService.execute({ email, password });
        return response.status(result.status).json(result);
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map