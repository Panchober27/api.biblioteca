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

// Esta es la nueva ruta que deberia funcionar con un algoritmo de busqueda por burbuja.

// router.get('/ejemplares', c.getLibrosRevTrab);


router.post('/books', );





export default router;