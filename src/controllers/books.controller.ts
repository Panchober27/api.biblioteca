import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import { Libros } from '../entities';

export class BooksController {
    getBooks = async (req: Request, res: Response): Promise<Response> => {
        let books: Libros[];
        try {
            const booksRepo: Repository<Libros> = getRepository(Libros);
            books = await booksRepo.find();
        } catch (err: any) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(books);
    }


}