"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../../../middleware/authMiddleware");
const PermissionController_1 = __importDefault(require("../controllers/PermissionController"));
const router = (0, express_1.Router)();
const controller = new PermissionController_1.default();
router.get('/', authMiddleware_1.authMiddleware, controller.getAll);
exports.default = router;
//# sourceMappingURL=PermissionRoutes.js.map