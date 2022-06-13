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

            const userLogged = req.user;
            console.log(userLogged);

            const prestamosRepository = getRepository(Prestamos);
            const prestamos = await prestamosRepository.createQueryBuilder('p')
                .leftJoinAndSelect('p.usuario', 'u')
                .leftJoinAndSelect('p.alumno', 'alumno')
                .leftJoinAndSelect('p.prestamoEjemplars', 'pe')
                .leftJoinAndSelect('pe.ejemplar', 'e')
                .leftJoinAndSelect('e.libro', 'l')
                .leftJoinAndSelect('e.trabajo', 't')
                .leftJoinAndSelect('e.revista', 'r')
                .where('u.usuario_id = :id', { id: userLogged.usuarioId })
                .getMany();
                // TODO: 
                // 1. Filtrar datos de usuario.

            if (!prestamos || prestamos.length === 0) {
                return res.sendStatus(204);
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
                // usuarioId,
                // alumnoId,
                // ejemplares [ids]
            } = req.body;

            await runner.startTransaction();

            // pasos para crear un nuevo prestamo.

            // 1. Crear un nuevo prestamo. Asociar: usurio,alumno,[ejemplares]
            // 2. Crear un nuevo prestamoEjemplar. Asociar: prestamo,ejemplar
            // 3. Actualizar el estado de los ejemplares a prestado.
            // 4. Actualizar el stock de los ejemplares restando 1 al stock.

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