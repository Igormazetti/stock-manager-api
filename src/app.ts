import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import employeeRouter from 'modules/employees/routes/employee.routes';
import productRouter from './modules/products/routes/ProductRoutes';
import companyRouter from './modules/companies/routes/CompanyRoutes';
import salesRouter from './modules/sales/routes/sales.routes';
import clientRouter from './modules/clients/routes/ClientRoutes';
import notificationsRouter from './modules/notifications/routes/notifications.routes';
import authRouter from './modules/auth/routes/AuthRoutes';
import permissionRouter from './modules/permissions/routes/PermissionRoutes';
import roleRouter from './modules/roles/routes/RoleRoutes';

const app = express();

const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Cache-Control', 'Pragma'],
  credentials: true,
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Auth routes
app.use('/auth', authRouter);

// Protected routes
app.use('/products', productRouter);
app.use('/company', companyRouter);
app.use('/sales', salesRouter);
app.use('/employees', employeeRouter);
app.use('/clients', clientRouter);
app.use('/notifications', notificationsRouter);
app.use('/permissions', permissionRouter);
app.use('/roles', roleRouter);

export default app;
