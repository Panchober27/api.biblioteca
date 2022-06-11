import { Router } from 'express';
import { PrestamosController } from '../controllers'


const router = Router();
const c = new PrestamosController();


router.get('/prestamos', c.getPrestamos);

// router.post('/prestamos', controller.insertPrestamo);

// router.put('/prestamos/:id', controller.updatePrestamo);

export default router;