import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers';

const router = Router();

router.get('/books', (req: Request, res: Response) => {
    return res.send('Obtener todos los libros');
});



export default router;