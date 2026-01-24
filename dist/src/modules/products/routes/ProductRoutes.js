"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const authMiddleware_1 = require("../../../middleware/authMiddleware");
const productRouter = (0, express_1.Router)();
const productController = new ProductController_1.default();
productRouter.get('/', authMiddleware_1.authMiddleware, productController.getProductByCompanyId);
productRouter.post('/create', authMiddleware_1.authMiddleware, productController.create);
productRouter.patch('/update/:id', authMiddleware_1.authMiddleware, productController.update);
exports.default = productRouter;
//# sourceMappingURL=ProductRoutes.js.map