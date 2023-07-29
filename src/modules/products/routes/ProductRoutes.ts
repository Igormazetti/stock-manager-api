import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { authMiddleware } from '../../../middleware/authMiddleware';

const productRouter = Router();
const productController = new ProductController();

productRouter.post('/create', authMiddleware, productController.create);
productRouter.get('/', authMiddleware, productController.getProductByCompanyId);

export default productRouter;
