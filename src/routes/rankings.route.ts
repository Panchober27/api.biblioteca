import { Router } from 'express';
import { RankingController } from '../controllers';
// import { schemaValidator } from '../middlewares';

const router = Router();
const c = new RankingController();


// direnciamos rutas por verbo, pero post no realiza inserciones
router.get('/rankings', c.getEjemplaresPrestado);
router.post('/rankings');



export default router;