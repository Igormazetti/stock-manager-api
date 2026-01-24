"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const employee_routes_1 = __importDefault(require("modules/employees/routes/employee.routes"));
const ProductRoutes_1 = __importDefault(require("./modules/products/routes/ProductRoutes"));
const CompanyRoutes_1 = __importDefault(require("./modules/companies/routes/CompanyRoutes"));
const sales_routes_1 = __importDefault(require("./modules/sales/routes/sales.routes"));
const ClientRoutes_1 = __importDefault(require("./modules/clients/routes/ClientRoutes"));
const notifications_routes_1 = __importDefault(require("./modules/notifications/routes/notifications.routes"));
const AuthRoutes_1 = __importDefault(require("./modules/auth/routes/AuthRoutes"));
const PermissionRoutes_1 = __importDefault(require("./modules/permissions/routes/PermissionRoutes"));
const RoleRoutes_1 = __importDefault(require("./modules/roles/routes/RoleRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
// Auth routes
app.use('/auth', AuthRoutes_1.default);
// Protected routes
app.use('/products', ProductRoutes_1.default);
app.use('/company', CompanyRoutes_1.default);
app.use('/sales', sales_routes_1.default);
app.use('/employees', employee_routes_1.default);
app.use('/clients', ClientRoutes_1.default);
app.use('/notifications', notifications_routes_1.default);
app.use('/permissions', PermissionRoutes_1.default);
app.use('/roles', RoleRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map