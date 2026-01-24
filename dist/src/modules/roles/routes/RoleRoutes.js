"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../../../middleware/authMiddleware");
const RoleController_1 = __importDefault(require("../controllers/RoleController"));
const router = (0, express_1.Router)();
const controller = new RoleController_1.default();
router.get('/', authMiddleware_1.authMiddleware, controller.getAll);
router.post('/', authMiddleware_1.authMiddleware, controller.create);
router.patch('/:id', authMiddleware_1.authMiddleware, controller.update);
router.delete('/:id', authMiddleware_1.authMiddleware, controller.delete);
exports.default = router;
//# sourceMappingURL=RoleRoutes.js.map