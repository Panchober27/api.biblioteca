import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import { Prestamos, Libros, PrestamoEjemplar, Trabajos, Revistas, Ejemplar, LibroStock, RevistaStock, TrabajoStock } from '../entities';
import moment from 'moment';

/**
 * @module Prestamos
 * @description Controlador de Prestamos
 */
export class PrestamosController {


    getPrestamos = async (req: Request, res: Response) => {
        return res.json({ message: 'getPrestamos' });
    }



    /**
     * @function getPrestamosByLoggedUser
     * @description Obtiene los prestamos del usuario logueado
     * @returns {Array<Prestamos>}
     */
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
                .where('p.estado != :estado', { estado: 'FINALIZADO' })
                // .where('u.usuario_id = :id', { id: userLogged.usuarioId })
                // .andWhere('p.estado = :estado', { estado: 'PRESTADO' })
                // .orWhere('p.estado = :estado', { estado: 'ATRASADO' })
                // .andWhere('e.estado = :estado', { estado: 'PRESTADO' })
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
     * @function insertPrestamo
     * @description Función que permite insertar un nuevo prestamo.
     * Todo funciona bien, excepto un par de casos a revisar:
     * 1. el manejo de stocks parece estar complicado.
     * @param {Request} req Objeto con los datos de la petición.
     * @param {Response} res Objeto con los datos de la respuesta.
     * @returns {object} Objeto con el status de la petición.
     */
    insertPrestamo = async (req: Request, res: Response): Promise<Response> => {
        const runner = getConnection().createQueryRunner();
        await runner.connect();
        let ejemplaresArr: any[] = [];
        try {
            const prestamo = req.body;
            const { libros, alumno } = prestamo;
            const fechaInicioPrestamo = new Date();

            if (!alumno || !libros || libros.length === 0 || !libros || libros.length === 0) {
                return res.status(400).json({ error: 'Faltan datos' });
            }

            // se recuperan las fechas de termino de los libros?.
            const fechasRetornos = libros.map(l => {
                return l.fechaRetorno;
            });



            // se iteran los ejemplares y se guarda el primero en el array.
            libros.forEach(l => ejemplaresArr.push(l.ejemplars.shift()));


            // logica para encontrar la fecha mas tardia, para ser asginada como la fecha fin del prestamo.
            const fechaDevolucion = libros.reduce((fechaDev, l) => {
                // console.log(l.fechaRetorno)
                const fecha = moment(l.fechaRetorno, 'DD-MM-YYYY').valueOf()
                return fecha > fechaDev ? fecha : fechaDev
            }, 0)
            // console.log('fecha de devolucion: ' + moment(fechaDevolucion).format('DD-MM-YYYY'))

            await runner.startTransaction();

            const { prestamoId } = await runner.manager.save(Prestamos, {
                alumnoId: alumno.alumnoId,
                usuarioId: req.user.usuarioId,
                fechaInicio: fechaInicioPrestamo,
                fechaFin: moment(fechaDevolucion).format('YYYY-MM-DD'), // 
                estado: 'PRESTADO',
            });
            // 4. Actualizar el stock de los ejemplares.
            await ejemplaresArr.forEach(async ejemplar => {
                const libroStock = await runner.manager.findOne(LibroStock, {
                    where: {
                        libroId: ejemplar.libroId,
                    },
                })
                if (libroStock) {
                    await runner.manager.update(LibroStock, { libroStockId: libroStock.libroStockId },
                        {
                            enBiblioteca: libroStock.enBiblioteca - 1,
                            enPrestamo: libroStock.enPrestamo + 1,
                        });
                }
            });

            // ejemplaresArr array de con los ejemplares a relacionar en prestamoEjemplar.
            await ejemplaresArr.forEach(async ejemplar => {
                const { prestamoEjemplarId } = await runner.manager.save(PrestamoEjemplar, {
                    prestamoId,
                    ejemplarId: ejemplar.ejemplarId,
                });
            });



            // Actualizar la fecha de fin para los ejemplares, usando fechasRetornos.
            ejemplaresArr.forEach(async ejemplar => {
                // forameteo la fecha desde un formato a otro para ser valido para la base de datos 🐱‍👤
                const date = new Date(moment(fechasRetornos[ejemplaresArr.indexOf(ejemplar)], 'DD-MM-YYYY').format('YYYY-MM-DD'));
                // actualizar la fechas de los ejemplares.
                await runner.manager.update(Ejemplar, { ejemplarId: ejemplar.ejemplarId }, {
                    estado: 'PRESTADO',
                    fechaEntrega: new Date(),
                    fechaFin: date,
                })
            });


            await runner.commitTransaction();

            return res.sendStatus(200);

        } catch (err: any) {
            await runner.rollbackTransaction();
            console.error(err);
            return res.status(500).json({ error: err.message });
        } finally {
            await runner.release();
        }

    }



    // Funcion encargada de realizar el retorno de 1 o mas ejemplares del prestamo.
    // al retornar un ejemplar se debe actualizar el stock de ese libro


    /**
     * @function updatePrestamo
     * @description Función que permite actualizar un prestamo. retornando uno o mas ejemplares.
     * @param {Request} req Objeto con los datos de la petición.
     * @param {Response} res Objeto con los datos de la respuesta.
     * @returns {Status} Objeto con el status de la petición.
     */
    updatePrestamo = async (req: Request, res: Response): Promise<Response> => {
        const runner = getConnection().createQueryRunner();
        await runner.connect();
        let ejemplares: any[] = [];

        try {

            const prestamoId = req.params.id;
            let keys = Object.keys(req.body);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                ejemplares.push(req.body[key].ejemplar);
            }
            
            // await runner.startTransaction();

            // // 1. actualizar los ejemplares. cambiando el estado y asignando la fecha de entrega.
            // ejemplares.forEach(async (ejemplar) => {
            //     await runner.manager.update(Ejemplar, { ejemplarId: ejemplar.ejemplarId }, {
            //         estado: 'DISPONIBLE',
            //         fechaDevolucion: new Date()
            //     });
            // });


            // // 2. actualizar el stock de los ejemplares.
            // ejemplares.forEach(async (ejemplar) => {
            //     const libroStock = await runner.manager.findOne(LibroStock, {
            //         where: {
            //             libroId: ejemplar.libroId,
            //         },
            //     })
            //     if (libroStock) {
            //         await runner.manager.update(LibroStock, { libroStockId: libroStock.libroStockId },
            //             {
            //                 enBiblioteca: libroStock.enBiblioteca + 1,
            //                 enPrestamo: libroStock.enPrestamo - 1,
            //             });
            //     }
            // });


            // // 3. actualizar el estado del prestamo.
            // // 3.1 Obtener los ejemplares relacionados al prestamo. y si todos estan todos con estado DISPONIBLE
            // // se cambia el estado del prestamo a FINALIZADO.
            // // 3.2 Si la fecheDevolucion es mayor a fechaFin en alguno de los ejemplares, se cambia el estado del prestamo a FINAlIZADO_ATRASADO.
            // const ejemplaresPrestamo = await runner.manager.find(PrestamoEjemplar, {
            //     where: {
            //         prestamoId: prestamoId,
            //     },
            // });

            // let estadoPrestamo = 'FINALIZADO';

            // ejemplaresPrestamo.forEach(async (ejemplar) => {
            //     const ejemplarActualizado = await runner.manager.findOne(Ejemplar, {
            //         where: {
            //             ejemplarId: ejemplar.ejemplarId,
            //             estado: 'PRESTADO',
            //         },
            //     });

            //     if (ejemplarActualizado) {
            //         if (ejemplarActualizado.fechaDevolucion && ejemplarActualizado.fechaFin ? ejemplarActualizado.fechaDevolucion > ejemplarActualizado.fechaFin : null) {
            //             estadoPrestamo = 'FINALIZADO_ATRASADO';
            //         }

            //         if(ejemplarActualizado.fechaFin < new Date() && ejemplarActualizado.fechaDevolucion == null) {
            //             estadoPrestamo = 'PRESTADO';
            //         }
            //     }
            // });

            // if (estadoPrestamo === 'FINALIZADO_ATRASADO') {
            //     await runner.manager.update(Prestamos, { prestamoId: prestamoId }, {
            //         estado: 'FINALIZADO_ATRASADO',
            //     });
            // } else {
            //     await runner.manager.update(Prestamos, { prestamoId: prestamoId }, {
            //         estado: 'FINALIZADO',
            //     });
            // }

            // await runner.commitTransaction();

            const response = {
                prestamoId,
                ejemplares,
            }

            return res.send(response);


        } catch (err: any) {
            // await runner.rollbackTransaction();
            console.error(err);
            return res.status(500).json({ errror: err.message });
        } 
        // finally {
        //     await runner.release();
        // }
    }



    returnEjemlparOfPrestamo = async (req: Request, res: Response) => {
    };


}