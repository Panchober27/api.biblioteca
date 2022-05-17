import { Router } from 'express';
import { PrestamosController } from '../controllers'

const router = Router();

const controller = new PrestamosController();

router.get('/prestamos', controller.getPrestamos);

router.post('/prestamos', controller.insertPrestamo);

export default router;