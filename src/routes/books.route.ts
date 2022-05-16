import { Router, Request, Response } from 'express';
import { BooksController } from '../controllers';

const router = Router();
const c = new BooksController();

router.get('/books', c.getBooks);



export default router;