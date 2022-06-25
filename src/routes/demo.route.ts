import { Router, Request, Response } from 'express';
import { DemoController } from '../controllers';

const router = Router();
const c = new DemoController();


// Rutas para pronar funciones con postman sin desactivar middleware de auth.
router.get('/demo', c.getLibrosRevTrab);
router.post('demo')
router.put('demo')


export default router;