import { Router } from 'express';
import { AuthController } from '../controllers';
import { schemaValidator } from '../middlewares';

// documentacion jsdoc
// el contenido de este archivo debe pertenecer al modulo AuthController
/**
 * @module authRoutes
 * 
 */

const router = Router();
const authController = new AuthController();

/**
 * @function post('/signin')
 * @description Ruta que invoca  que permite iniciar sesión.
 * @see {@link AuthController#signin}
 */
router.post('/signin', schemaValidator('SIGNIN'), authController.signin);

export default router;
