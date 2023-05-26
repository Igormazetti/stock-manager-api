import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import productRouter from './modules/products/routes/ProductsRoutes';
import companyRouter from './modules/companies/routes/CompanyRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/products', productRouter);
app.use('/company', companyRouter);

export default app;
