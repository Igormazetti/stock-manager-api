"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../../../middleware/authMiddleware");
const NotificationsController_1 = __importDefault(require("../controllers/NotificationsController"));
const notificationsRouter = (0, express_1.Router)();
const notificationsController = new NotificationsController_1.default();
notificationsRouter.get('/', authMiddleware_1.authMiddleware, (request, response) => notificationsController.getAll(request, response));
notificationsRouter.patch('/:id', authMiddleware_1.authMiddleware, (request, response) => notificationsController.markAsRead(request, response));
exports.default = notificationsRouter;
//# sourceMappingURL=notifications.routes.js.map