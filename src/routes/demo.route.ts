import { Router, Request, Response } from 'express';
import { DemoController } from '../controllers';

const router = Router();
const c = new DemoController();


// Rutas para pronar funciones con postman si n desactivar middleware de auth.
// router.get('/demo', c.insertLibros);
// router.get('/demo', c.validateCounts);
// router.get('/demo', c.checkDateFormat);
router.get('/demo', c.demo);

// funcion para incertar libros con ejemplares.
// router.post('/demo', c.insertLibros);
// router.post('/demo', c.insertarDemosPrestamos);
router.post('/demo', c.insertLibros);
// router.post('/demo', c.historicPrestamos);

// funcion para genera prestamo.
// router.post('/demo', c.generarPrestamo);



export default router;