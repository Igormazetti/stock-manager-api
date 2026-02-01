import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

router.post('/company/login', authController.login);

export default router;
