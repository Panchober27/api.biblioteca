import { Router } from 'express';
import { AuthController } from '../controllers';
import { schemaValidator } from '../middlewares';

const router = Router();
const authController = new AuthController();

router.post('/signin', schemaValidator('SIGNIN'), authController.signin);

export default router;
