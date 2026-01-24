"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SalesController_1 = __importDefault(require("../controllers/SalesController"));
const authMiddleware_1 = require("../../../middleware/authMiddleware");
const salesRouter = (0, express_1.Router)();
const salesController = new SalesController_1.default();
salesRouter.post('/create', authMiddleware_1.authMiddleware, salesController.create);
salesRouter.get('/', authMiddleware_1.authMiddleware, salesController.getAll);
salesRouter.patch('/:id', authMiddleware_1.authMiddleware, (request, response) => salesController.update(request, response));
exports.default = salesRouter;
//# sourceMappingURL=sales.routes.js.map