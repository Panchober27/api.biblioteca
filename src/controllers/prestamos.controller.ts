import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import { Prestamos, Libros, PrestamoEjemplar, Trabajos, Revistas } from '../entities';


export class PrestamosController {

    /**
     * @function getPrestamos
     * @param req 
     * @param res 
     * @returns 
     */
    getPrestamos = async (req: Request, res: Response) => {
        return res.json({ message: 'getPrestamos' });
    }



    insertPrestamo = async (req: Request, res: Response) => {

        const runner = getConnection().createQueryRunner();
        await runner.connect();

        try {
            const {

            } = req.body;

            const prestamoRepository: Repository<Prestamos> = getRepository(Prestamos);
            const ejemplarRepository: Repository<PrestamoEjemplar> = getRepository(PrestamoEjemplar);
            const libroRepository: Repository<Libros> = getRepository(Libros);
            const trabajosRepository: Repository<Trabajos> = getRepository(Trabajos);
            const revistasRepository: Repository<Revistas> = getRepository(Revistas);

            await runner.startTransaction();


            await runner.commitTransaction();
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ errror: err.message });
        } finally {
            await runner.release();
        }

    }


}