"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../../../middleware/authMiddleware");
const EmployeesController_1 = __importDefault(require("../controllers/EmployeesController"));
const employeeRouter = (0, express_1.Router)();
const employeeController = new EmployeesController_1.default();
employeeRouter.post('/', authMiddleware_1.authMiddleware, employeeController.create);
employeeRouter.get('/', authMiddleware_1.authMiddleware, employeeController.getEmployees);
employeeRouter.patch('/:id', authMiddleware_1.authMiddleware, employeeController.update);
employeeRouter.delete('/:id', authMiddleware_1.authMiddleware, employeeController.delete);
exports.default = employeeRouter;
//# sourceMappingURL=employee.routes.js.map