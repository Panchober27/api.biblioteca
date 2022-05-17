import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import { Libros } from '../entities';

export class BooksController {

    /**
     * @function getBooks
     * Funcion para retornar un listado de libbros, con su tipo de libro asociado.
     * @param req 
     * @param res 
     * @returns 
     */
    getBooks = async (req: Request, res: Response): Promise<Response> => {

        // faltan validaciones.!!
        // tambien podriamos retornar datos del prestamo asociado(prestamo,usuario,alumno,etc...)
        let books: Libros[];
        try {
            const booksRepo: Repository<Libros> = getRepository(Libros);

            books = await booksRepo.createQueryBuilder("b")
                .leftJoinAndSelect("b.tipoLibro2", "tl")
                .getMany();

        } catch (err: any) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(books);
    }



    /**
     * @function insertBook
     * Esta funcion es para añadir un nuevo libro al sistema.
     * @param res 
     */
    insertBook = async (req: Request, res: Response) => {
        // crear nuevo libro. seleccionando el tipo de libro
        // para incertar el libro se debe asignar el id del tipo libro (esto desde el frontend.)
        // datos para el nuevo libro (admin ingresando un libro)
        const {
            isbn,
            isbnTipo,
            nombre,
            autor,
            editorial,
            edicion,
            fechaPublicacion,
            tipoLibro
        } = req.body; // de esta forma se esta haciendo destructuring del objeto.

        // const nBook = req.body;  // de esta forma NO se esta haciendo destructuring del objeto.

        // obtengo repositorio(tabla) de libros
        const booksRepo = getRepository(Libros);

        try {
            // creo un nuevo libro (en memoria!!)
            const newBook = booksRepo.create({
                isbn,
                isbnTipo,
                nombre,
                autor,
                editorial,
                edicion,
                fechaPublicacion,
                tipoLibro,
            });
            // inserto el libro en la base de datos  esto es el simil de insert into libros...
            const insert = await booksRepo.save(newBook, { reload: false });

            // retorno status 200 en caso de que sea exitoso!
            console.log(insert);
            return res.sendStatus(200)

        } catch (err: any) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
    }


}