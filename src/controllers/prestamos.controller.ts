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




    getPrestamosByLoggedUser = async (req: Request, res: Response) => {
        try {
            const prestamosRepository = getRepository(Prestamos);
            const prestamos = await prestamosRepository.createQueryBuilder('p')
                .leftJoinAndSelect('p.usuario', 'u')
                .leftJoinAndSelect('p.ejemplares', 'e')
                .leftJoinAndSelect('e.libro', 'l')
                .leftJoinAndSelect('e.trabajo', 't')
                .leftJoinAndSelect('e.revista', 'r')
                .where('u.usuario_id = :id', { id: req.user.usuario_id })
                .getMany();

            if (!prestamos || prestamos.length === 0) {
                return res.status(404).json({ message: 'No se encontraron prestamos' });
            }

            return res.status(200).json(prestamos);

        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

    }





    /**
     * Para generar un nuevo prestamo.
     */
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

    /**
     * @function updatePrestamo
     * @param req 
     * @param res 
     * 
     * Para finalizar? un prestamo.
     * 
     */
    updatePrestamo = async (req: Request, res: Response) => {
    }

}