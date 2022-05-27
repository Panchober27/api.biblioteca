import { Router } from 'express';
import {Request, Response} from 'express';

const router = Router();

router.get('/base', (req:Request, res:Response) => {
  res.send('api biblioteca actica 📗📘😋');
});

export default router;