"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CompanyController_1 = __importDefault(require("../controllers/CompanyController"));
const authMiddleware_1 = require("../../../middleware/authMiddleware");
const companyRouter = (0, express_1.Router)();
const companyController = new CompanyController_1.default();
companyRouter.post('/', companyController.create);
companyRouter.post('/login', companyController.login);
companyRouter.post('/reset-password', authMiddleware_1.authMiddleware, companyController.resetPassword);
companyRouter.put('/update', authMiddleware_1.authMiddleware, companyController.update);
companyRouter.get('/', authMiddleware_1.authMiddleware, companyController.get);
exports.default = companyRouter;
//# sourceMappingURL=CompanyRoutes.js.map