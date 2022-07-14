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

            if (!alumno || !libros || libros.length === 0) {
                return res.status(400).json({ error: 'Faltan datos' });
            }

            // se recuperan las fechas de termino de los libros?.
            const fechasRetornos = libros.map(l => {
                return l.fechaRetorno;
            });
            

            console.log(fechasRetornos);


            // se iteran los ejemplares y se guarda el primero en el array.
            libros.forEach(l => ejemplaresArr.push(l.ejemplars.shift()));


            // logica para encontrar la fecha mas tardia, para ser asginada como la fecha fin del prestamo.
            const fechaDevolucion = libros.reduce((fechaDev, l) => {
                // console.log(l.fechaRetorno)
                const fecha = moment(l.fechaRetorno, "DD-MM-YYYY").valueOf()
                return fecha > fechaDev ? fecha : fechaDev
            }, 0)
            console.log('fecha de devolucion: ' + moment(fechaDevolucion).format("DD-MM-YYYY"))

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



            // TODO: Esto no esta funcionando che!!!!!!!
            // Actualizar la fecha de fin para los ejemplares, usando fechasRetornos.
            // await ejemplaresArr.forEach(async ejemplar => {
            //     await runner.manager.update(Ejemplar, { ejemplarId: ejemplar.ejemplarId }, {
            //         // fechaFin: '2022-12-31',
            //         fechaFin: fechasRetornos[ejemplaresArr.indexOf(ejemplar)],
            //     });
            // });





            // editar los ejemplares ya existentes, remplazandolos por los ejemplares dentro ejemplarsArr




            // 3. Actualizar el estado de los ejemplares a prestado.
            // await ejemplaresArr.forEach(async ejemplar => {
            //     await runner.manager.update(Ejemplar,
            //         { ejemplarId: ejemplar.ejemplarId },
            //         {
            //             estado: 'PRESTADO',
            //             fechaEntrega: fechaInicioPrestamo,
            //             // fechaFin: moment(fechasRetornos[ejemplaresArr.indexOf(ejemplar)]).format('YYYY-MM-DD'),
            //             fechaFin: '25-12-2020',
            //         }
            //     );
            // });


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


    // Funcion encargada de realizar el retorno de 1 o mas ejemplares del prestamo.
    // al retornar un ejemplar se debe actualizar el stock de ese libro
    updatePrestamo = async (req: Request, res: Response): Promise<Response> => {
        // const runner = getConnection().createQueryRunner();
        // await runner.connect();
        try {
            // await runner.startTransaction();
            // await runner.commitTransaction();


            // se recibira desde el body un arreglo con los ejemplares que se retornaron.



            // una vez se haya finalizado el retorno de los ejemplares se debe actualizar el estado de los ejemplares a disponible.
            // se debe actualizar el stock de los libros

            // se debe validar si todos los ejemplares del prestamo al que estan asociados fueron retornados.

            // se debe revisar si alguna de las fechas ejemplar.fechaFin 

            // ejemplar.fechaFin
            // ejemplar.fechaDevolucion


            // Aramado de la logica 🐱‍👤

            return res.send('ok');

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