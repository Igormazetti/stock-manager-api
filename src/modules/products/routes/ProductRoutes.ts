import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { authMiddleware } from '../../../middleware/authMiddleware';

const productRouter = Router();
const productController = new ProductController();

productRouter.get('/', authMiddleware, productController.getProductByCompanyId);
productRouter.post('/create', authMiddleware, productController.create);
productRouter.patch('/update', authMiddleware, productController.update);

export default productRouter;
