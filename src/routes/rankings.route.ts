import { Router } from 'express';
import { RankingController } from '../controllers';
// import { schemaValidator } from '../middlewares';

const router = Router();
const c = new RankingController();



// TODO: 
// las peticiones seran por post.
// en el body se debe agregar a que entidad van las consultas.
// en base a esto se deben hacer las distintas consultas.




// direnciamos rutas por verbo, pero post no realiza inserciones
router.get('/rankings', c.getEjemplaresPrestado);
router.post('/rankings', c.getCountLibroPrestadoXMes);



export default router;