"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClientController_1 = __importDefault(require("../controllers/ClientController"));
const authMiddleware_1 = require("../../../middleware/authMiddleware");
const clientRouter = (0, express_1.Router)();
const clientController = new ClientController_1.default();
clientRouter.get('/', authMiddleware_1.authMiddleware, clientController.getClientsByCompanyId);
clientRouter.post('/create', authMiddleware_1.authMiddleware, clientController.create);
clientRouter.patch('/update/:id', authMiddleware_1.authMiddleware, clientController.update);
clientRouter.delete('/delete/:id', authMiddleware_1.authMiddleware, clientController.delete);
exports.default = clientRouter;
//# sourceMappingURL=ClientRoutes.js.map