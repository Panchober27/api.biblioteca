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
                // .where('p.estado != :estado', { estado: 'FINALIZADO' })
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

            // filtrar los ejemplares de cada prestamo y si el o los ejemplares estan con estado disponible
            // quitarlos del prestamo.


            //  REVISA ESTA WEAAAAAAAAAAAAAAAAAA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            // prestamos.forEach(prestamo => {
            //     prestamo.prestamoEjemplars.forEach(prestamoEjemplar => {
            //         if (prestamoEjemplar.ejemplar.estado === 'DISPONIBLE') {
            //             prestamo.prestamoEjemplars = prestamo.prestamoEjemplars.filter(prestamoEjemplar => prestamoEjemplar.ejemplar.ejemplarId !== prestamoEjemplar.ejemplar.ejemplarId);
            //         }
            //     });
            // });

            // recorrer los prestamos y si algun prestamo no tiene ejemplares, eliminarlo.
            // prestamos.forEach((prestamo, index) => {
            //     if (prestamo.prestamoEjemplars.length === 0) {
            //         prestamos.splice(index, 1);
            //     }
            // });

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
     * @returns {object}g Objeto con el status de la petición.
     */
    insertPrestamo = async (req: Request, res: Response): Promise<Response> => {
        const runner = getConnection().createQueryRunner();
        await runner.connect();
        let ejemplaresArr: any[] = [];
        try {
            await runner.startTransaction();

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


        } catch (err: any) {
            await runner.rollbackTransaction();
            console.error(err);
            return res.status(500).json({ error: err.message });
        } finally {
            await runner.release();
        }
        return res.sendStatus(200);

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
    // updatePrestamo = async (req: Request, res: Response): Promise<Response> => {
    //     const runner = getConnection().createQueryRunner();
    //     await runner.connect();
    //     let ejemplares: any[] = [];

    //     /**
    //      * AGREGAR LOGICA PARA ELIMINAR DE SUS MULTAS  A LOS ALUMNOS!!!!
    //      */
    //     try {
    //         await runner.startTransaction();

    //         // recupero los ejemplares que se actualizan desde el frontend
    //         let keys = Object.keys(req.body);
    //         for (let i = 0; i < keys.length; i++) {
    //             let key = keys[i];
    //             ejemplares.push(req.body[key].ejemplar);
    //         }

    //         // 1 primero obtener el prestamo desde la bd en base al prestamo id.
    //         const prestamo = await runner.manager.findOne(Prestamos, {
    //             where: {
    //                 prestamoId: req.params.id,
    //             },
    //         });
    //         // obtener que ejemplares estan asociados a este prestamo.

    //         if (!prestamo) {
    //             return res.sendStatus(400);
    //         }

    //         // actualizar los stocks de libros en base a los libbroId de los ejemplares.
    //         ejemplares.forEach(async e => {
    //             const libroStock = await runner.manager.findOne(LibroStock, {
    //                 where: {
    //                     libroId: e.libroId,
    //                 },
    //             })
    //             if (libroStock) {
    //                 await runner.manager.update(LibroStock, { libroStockId: libroStock.libroStockId },
    //                     {
    //                         enBiblioteca: libroStock.enBiblioteca + 1,
    //                         enPrestamo: libroStock.enPrestamo - 1,
    //                     });
    //             }
    //         });

    //         ejemplares.forEach( async (e) => {
    //             // actualizar las fechas de los ejemplares a null.
    //             await runner.manager.update(Ejemplar, { ejemplarId: e.ejemplarId }, {
    //                 estado: 'DISPONIBLE',
    //                 fechaEntrega: null,
    //                 fechaFin: null,
    //                 fechaDevolucion: null,
    //             })
    //         })
    //         const ejemplaresPrestamo = await runner.manager.createQueryBuilder(Ejemplar, 'e')
    //             .leftJoinAndSelect('e.prestamoEjemplars', 'pe')
    //             .leftJoinAndSelect('pe.prestamo', 'p')
    //             .where('p.prestamoId = :prestamoId', { prestamoId: req.params.id })
    //             .andWhere('e.estado = :estado', { estado: 'PRESTADO' })
    //             .getMany();

    //             console.log(ejemplaresPrestamo);

    //         // si los ejemplares asociados a este prestamo tienen fechas null entonces finalizar el prestamo
    //         // si el estado del prestamo es atrasado se debe finalizar como FINALIZADO_ATRASADO
    //         if (ejemplaresPrestamo.map(e => e.fechaFin === null && e.estado === 'DISPONIBLE')) {
    //             console.log('entroooooooo!')
    //             if (prestamo.estado === 'ATRASADO') {
    //                 await runner.manager.update(Prestamos, { prestamoId: req.params.id }, {
    //                     estado: 'FINALIZADO_ATRASADO',
    //                     fechaTermino: new Date(),
    //                 })
    //             } else {
    //                 await runner.manager.update(Prestamos, { prestamoId: req.params.id }, {
    //                     estado: 'FINALIZADO',
    //                     fechaTermino: new Date(),
    //                 })
    //             }
    //         }

    //         await runner.commitTransaction();


    //         return res.sendStatus(200);

    //     } catch (err: any) {
    //         await runner.rollbackTransaction();
    //         console.error(err);
    //         return res.status(500).json({ errror: err.message });
    //     } finally {
    //         await runner.release();
    //     }
    // }


    updatePrestamo2 = async (req: Request, res: Response): Promise<Response> => {

        const runner = getConnection().createQueryRunner();
        await runner.connect();
        let ejemplares: any[] = [];
        let ejemplares2: any[] = [];
        try {
            await runner.startTransaction();

            const prestamoFrontId = Number(req.params.id);

            let keys = Object.keys(req.body);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                ejemplares.push(req.body[key].ejemplar);
            }

            console.log(`prestamo id: ${prestamoFrontId}`);
            console.table(ejemplares);

            // meter todo en una promesa
            Promise.all(ejemplares.map(async e => {
                // recorrer los ejemplares y actualizar el estado de los ejemplares
                await runner.manager.update(Ejemplar, { ejemplarId: e.ejemplarId }, {
                    estado: 'DISPONIBLE',
                    fechaEntrega: null,
                    fechaFin: null,
                    fechaDevolucion: null,
                })
            }))
                .then(async () => {

                    console.log('AHORA DEBERIAN VENIR ACTUALIZADOS LOS EJEMPLARES');
                    const backEjemplares = await runner.manager.createQueryBuilder(Ejemplar, 'e')
                        .leftJoinAndSelect('e.prestamoEjemplars', 'pe')
                        .leftJoinAndSelect('pe.prestamo', 'p')
                        .where('p.prestamoId = :prestamoId', { prestamoId: prestamoFrontId })
                        .getMany();

                    console.table(backEjemplares);

                    ejemplares2 = backEjemplares;

                })
            // actualizar los stocks de libros en base a los libbroId de los ejemplares.
            ejemplares2.forEach(async e => {
                console.log('ACTUALIZANDO EL STOCK DE LOS LIBROS');
                const libroStock = await runner.manager.findOne(LibroStock, {
                    where: {
                        libroId: e.libroId,
                    },
                })
                if (libroStock) {
                    await runner.manager.update(LibroStock, { libroStockId: libroStock.libroStockId },
                        {
                            enBiblioteca: libroStock.enBiblioteca + 1,
                            enPrestamo: libroStock.enPrestamo - 1,
                        });
                }
            });


            // si los ejemplares asociados a este prestamo tienen fechas null entonces finalizar el prestamo
            // si el estado del prestamo es atrasado se debe finalizar como FINALIZADO_ATRASADO


            // si todos los ejemplares del prestamo estan con estado DISPONILE, entonces modificar el estado del prestamo.
            // si el prestamo tiene estado ATRASADO debe finalizar FINALIZADO_ATRASADO
            // si el prestamo tiene estado PRESTADO debe finalizar FINALIZADO

            const ejemplaresPrestamo = await runner.manager.createQueryBuilder(Ejemplar, 'e')
                .leftJoinAndSelect('e.prestamoEjemplars', 'pe')
                .leftJoinAndSelect('pe.prestamo', 'p')
                .where('p.prestamoId = :prestamoId', { prestamoId: prestamoFrontId })
                .andWhere('e.estado IN (:estado1, :estado2)', { estado1: 'PRESTADO', estado2: 'ATRASADO' })
                .getMany();

            console.log('Validar si los ejemplares tienen estado atrasado o prestado');
            console.table(ejemplaresPrestamo);

            // si los ejemplares asociados a este prestamo tienen estado DISPONIBLE entonces finalizar el prestamo
            const prestamo = await runner.manager.findOne(Prestamos, {
                where: {
                    prestamoId: prestamoFrontId,
                },
            });


            if (ejemplaresPrestamo.every(e => e.estado === 'DISPONIBLE')) {
                console.log('entroooooooo!')
                if (prestamo && prestamo.estado === 'ATRASADO') {
                    await runner.manager.update(Prestamos, { prestamoId: prestamoFrontId }, {
                        estado: 'FINALIZADO_ATRASADO',
                        fechaTermino: new Date(),
                    })
                } else if (prestamo && prestamo.estado === 'PRESTADO') {
                    await runner.manager.update(Prestamos, { prestamoId: prestamoFrontId }, {
                        estado: 'FINALIZADO',
                        fechaTermino: new Date(),
                    })
                }
            }


            await runner.commitTransaction();


        } catch (err: any) {
            await runner.rollbackTransaction();
            console.error(err);
            return res.status(500).json({ error: err.message });
        } finally {
            await runner.release();
        }

        return res.sendStatus(200);
    }

    updatePrestamo = async (req: Request, res: Response): Promise<Response> => {

        let ejemplares: any[] = [];
        const prestamoId = Number(req.params.id);
        let keys = Object.keys(req.body);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            ejemplares.push(req.body[key].ejemplar);
        }
        const ejemplaresRepo = getRepository(Ejemplar);
        const libroStockRepo = getRepository(LibroStock);


        try {

            // 1obtener lista de ejemplares del prestamo en base al prestamoId.
            const ejemplaresPrestamo = await ejemplaresRepo.createQueryBuilder('e')
                .leftJoinAndSelect('e.prestamoEjemplars', 'pe')
                .leftJoinAndSelect('pe.prestamo', 'p')
                .where('p.prestamoId = :prestamoId', { prestamoId: prestamoId })
                .andWhere('e.estado != :estado', { estado: 'DISPONIBLE' })
                .getMany();
            console.table(ejemplaresPrestamo);


            // 2 actualizar los ejemplares. usando ejemplares como guia.
            console.table(ejemplares);


            // actualizar los ejemplares en base al id de cada ejemplar en ejemplares
            ejemplares.forEach(async e => {
                console.log('ACTUALIZANDO EL ESTADO DE LOS EJEMPLARES');
                await ejemplaresRepo.update(e.ejemplarId, {
                    estado: 'DISPONIBLE',
                    fechaEntrega: null,
                    fechaFin: null,
                    fechaDevolucion: null,
                });
            });

            // actualizar el stock de libros en base a los ejemplares.
            ejemplares.forEach(async e => {
                console.log('ACTUALIZANDO EL STOCK DE LOS LIBROS');
                const libroStock = await libroStockRepo.findOne({
                    where: {
                        libroId: e.libroId,
                    },
                })
                if (libroStock) {
                    await libroStockRepo.update(libroStock.libroStockId, {
                        enBiblioteca: libroStock.enBiblioteca + 1,
                        enPrestamo: libroStock.enPrestamo - 1,
                    });
                }
            });


            // como validar si todos los ejemplares del prestamo fueron retornados
            // si todos los ejemplares del prestamo estan con estado DISPONIBLE entonces finalizar el prestamo
            // si el prestamo tiene estado ATRASADO debe finalizar FINALIZADO_ATRASADO
            // si el prestamo tiene estado PRESTADO debe finalizar FINALIZADO
            let cantidadOriginal = ejemplaresPrestamo.length;
            let cantidadRetornados = ejemplares.length;

            if (cantidadOriginal === cantidadRetornados) {
                const prestamo = await getRepository(Prestamos).findOne({
                    where: {
                        prestamoId: prestamoId,
                    },
                });
                if (prestamo && prestamo.estado === 'ATRASADO') {
                    await getRepository(Prestamos).update(prestamoId, {
                        estado: 'FINALIZADO_ATRASADO',
                        fechaTermino: new Date(),
                    });
                } else if (prestamo && prestamo.estado === 'PRESTADO') {
                    await getRepository(Prestamos).update(prestamoId, {
                        estado: 'FINALIZADO',
                        fechaTermino: new Date(),
                    });
                }
            }






        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

        return res.sendStatus(200);
    }






    returnEjemlparOfPrestamo = async (req: Request, res: Response) => {
    };


}