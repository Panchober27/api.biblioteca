import { Router } from 'express';
import { UploadersController } from '../controllers'


const router = Router();
const c = new UploadersController();

router.get('/uploads', c.demoFunction);
router.post('/uploads', c.uploadFiles);

router.post('/uploadStudents')


export default router;
