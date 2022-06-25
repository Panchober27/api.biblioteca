import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import { Prestamos, Libros, PrestamoEjemplar, Trabajos, Revistas, Ejemplar, LibroStock, RevistaStock, TrabajoStock } from '../entities';


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




    insertPrestamo = async (req: Request, res: Response) => {
        // const {
        //     usuarioId = 2,
        //     alumnoId,
        //     ejemplares, // [{Ejemplar}]
        //     fechaInicioPrestamo,
        // } = req.body;

        try {

            const data = req.body;

            const userLogged = req.user;
            const usuarioId = userLogged.usuarioId;


            console.log(data);



            // const prestamo = new Prestamos();
            // prestamo.usuario = req.user;
            // prestamo.alumno = alumno;
            // prestamo.fechaInicio = new Date();
            // prestamo.fechaFin.setDate(prestamo.fechaInicio.getDate() + 7);
            // prestamo.estado = 'PRESTADO';
            // prestamo.prestamoEjemplars = ejemplares;
            // const prestamoRepository = getRepository(Prestamos);
            // await prestamoRepository.save(prestamo);


            // return res.status(201).json(prestamo);
            return res.sendStatus(200);


        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

    }



    /**
     * Para generar un nuevo prestamo.
     */
    insertPrestamo___ = async (req: Request, res: Response) => {

        const runner = getConnection().createQueryRunner();
        await runner.connect();
        // el usuario que genera el prestamo se recupera desde req.user

        try {
            const {
                usuarioId,
                alumnoId,
                ejemplares,
                fechaInicioPrestamo = new Date(),
            } = req.body;

            await runner.startTransaction();


            // pasos para crear un nuevo prestamo.
            // 1. Crear un nuevo prestamo. Asociar: usurio,alumno,[ejemplares] [alterar por cda ejemplar el stock]
            const { prestamoId } = await runner.manager.save(Prestamos, {
                alumnoId,
                usuarioId,
                fechaInicio: fechaInicioPrestamo,
                fechaFin: new Date(), // 
                estado: 'PRESTADO',
            });

            // 2. Crear un nuevo prestamoEjemplar. Asociar: prestamo,ejemplar
            if (ejemplares) {
                await ejemplares.forEach(async ejemplar => {
                    const { prestamoEjemplarId } = await runner.manager.save(PrestamoEjemplar, {
                        prestamoId,
                        ejemplarId: ejemplar.ejemplarId,
                    });
                });
            } else {
                return res.status(400).json({ error: 'No se encontraron ejemplares' });
            }


            // 3. Actualizar el estado de los ejemplares a prestado.
            await ejemplares.forEach(async ejemplar => {
                await runner.manager.update(Ejemplar, { ejemplarId: ejemplar.ejemplarId }, { estado: 'PRESTADO' });
            });


            // PROBLEMAS CON EL STOCK!!!
            // 4. Obtner de cada ejemplar si es libro o revista o trabajo y restar -1 al stock de ese libro, revista o trabajo.
            await ejemplares.forEach(async ejemplar => {
                if (ejemplar.libroId) {
                    const libroStockRepository = getRepository(LibroStock);
                    const libroStock = await libroStockRepository.createQueryBuilder('ls')
                        .leftJoinAndSelect('ls.libro', 'l')
                        .where('l.libroId = :id', { id: ejemplar.libroId })
                        .getOne();

                    if (libroStock) {
                        await runner.manager.update(LibroStock,
                            { libroStockId: libroStock.libroStockId },
                            {
                                // total: libroStock.total - 1,
                                enPrestamo: libroStock.enPrestamo + 1,
                                enBiblioteca: libroStock.enBiblioteca - 1,
                            }
                        );
                    }
                } else if (ejemplar.revistaId) {
                    const revistaStockRepository = getRepository(RevistaStock);
                    const revistaStock = await revistaStockRepository.createQueryBuilder('rs')
                        .leftJoinAndSelect('rs.revista', 'r')
                        .where('r.revistaId = :id', { id: ejemplar.revistaId })
                        .getOne();

                    if (revistaStock) {
                        await runner.manager.update(RevistaStock,
                            { revistaStockId: revistaStock.revistaStockId },
                            {
                                total: revistaStock.total - 1,
                                enPrestamo: revistaStock.enPrestamo + 1,
                                enBiblioteca: revistaStock.enBiblioteca - 1,
                            }
                        );
                    }
                } else if (ejemplar.trabajoId) {
                    const trabajoStockRepository = getRepository(TrabajoStock);
                    const trabajoStock = await trabajoStockRepository.createQueryBuilder('ts')
                        .leftJoinAndSelect('ts.trabajo', 't')
                        .where('t.trabajoId = :id', { id: ejemplar.trabajoId })
                        .getOne();

                    if (trabajoStock) {
                        await runner.manager.update(TrabajoStock,
                            { trabajoStockId: trabajoStock.trabajoStockId },
                            {
                                total: trabajoStock.total - 1,
                                enPrestamo: trabajoStock.enPrestamo + 1,
                                enBiblioteca: trabajoStock.enBiblioteca - 1,
                            }
                        );
                    }
                }
            });


            // Como ultimo paso editar el prestamo la fecha de fin
            // porque esa fecha se calcula en base a la fecha de entrega(devolucion) del ultimo ejemplar.
            // recorrer ejemplares y buscar la fecha mas tardia para usarla como la fecha fin del prestamo.
            // let fechaFinPrestamo = new Date();
            // ejemplares.forEach(ejemplar => {
            //     if (ejemplar.fechaDevolucion > fechaFinPrestamo) {
            //         fechaFinPrestamo = ejemplar.fechaDevolucion;
            //     }
            // });
            // await runner.manager.update(Prestamos, { prestamoId }, {
            //     fechaFin: fechaFinPrestamo,
            // });


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


    /**
     * @function returnEjemlparOfPrestamo
     * @param req 
     * @param res 
     * 
     * Esta funcion es para realizar la devolucion de 1 o mas ejemplares de un prestamo.
     */
    returnEjemlparOfPrestamo = async (req: Request, res: Response) => {
    };


}