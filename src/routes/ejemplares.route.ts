import { Router, Request, Response } from 'express';
import { EjemplaresController } from '../controllers';
/**
 * Este archivo contiene las rutas para las peticiones de los ejemplares.
 * Libros
 * Revistas
 * Trabajos
 */

const router = Router();
const c = new (EjemplaresController);


router.get('/ejemplares', c.getEjemplares);


// router.post('/books', c.insertBook);





export default router;