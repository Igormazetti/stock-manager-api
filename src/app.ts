import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import employeeRouter from 'modules/employees/routes/employee.routes';
import productRouter from './modules/products/routes/ProductRoutes';
import companyRouter from './modules/companies/routes/CompanyRoutes';
import salesRouter from './modules/sales/routes/sales.routes';
import clientRouter from './modules/clients/routes/ClientRoutes';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/products', productRouter);
app.use('/company', companyRouter);
app.use('/sales', salesRouter);
app.use('/employee', employeeRouter);
app.use('/clients', clientRouter);

export default app;
