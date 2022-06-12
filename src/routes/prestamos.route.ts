import { Router } from 'express';
import { PrestamosController } from '../controllers'


const router = Router();
const c = new PrestamosController();


router.get('/prestamos', c.getPrestamos); // todos los prestamos del sistema
router.get('/user-prestamos', c.getPrestamosByLoggedUser); // prestamos del usuario en sesion.

// router.post('/prestamos', controller.insertPrestamo);

// router.put('/prestamos/:id', controller.updatePrestamo);

export default router;