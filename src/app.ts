import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import productRouter from './modules/products/routes/ProductRoutes';
import companyRouter from './modules/companies/routes/CompanyRoutes';
import salesRouter from './modules/sales/routes/sales.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/products', productRouter);
app.use('/company', companyRouter);
app.use('/sales', salesRouter);

export default app;
