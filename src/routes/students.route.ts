import { Router } from 'express';
import { StudentsController } from '../controllers';
// import { schemaValidator } from '../middlewares';

const router = Router();
const controller = new StudentsController();



router.get('/students', controller.getStudents);


router.get('/students', controller.getStudents);


router.get('/students', controller.getStudents);


router.get('/students', controller.getStudents);


export default router;