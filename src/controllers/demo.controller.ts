import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import { Ejemplar, Libros, PrestamoEjemplar, Trabajos, Revistas, LibroStock, RevistaStock, TrabajoStock, Prestamos } from '../entities';

export class DemoController {




    
    validateCounts = async (req: Request, res: Response): Promise<Response>=> {
        try {
           
            const librosRepository: Repository<Libros> = getRepository(Libros);
            const ejemplaresRepository: Repository<Ejemplar> = getRepository(Ejemplar);

            const libros = await librosRepository.findOne({where : {libroId : 38}});
    
            const ejemplares = await ejemplaresRepository.find({where : {libroId : 37}});
            
            const stocks = await getRepository(LibroStock).find({where : {libroId : 37}});
            
            // ahora contar que stock total === cantidad de ejemplares

            console.log(`stockTotal: ${stocks[0].total}  ||  cantidad de ejemplares: ${ejemplares.length}  || del libro ${libros?.nombre}`);

            return res.status(200).json({
                message: 'ok',
                stockTotal: stocks[0].total,
                cantidadEjemplares: ejemplares.length,
                libro: libros?.libroId
            });

        } catch (err: any) {
            return res.status(500).json({
                message: err.message
            });
        }

    }



    
    insertLibros = async (req: Request, res: Response): Promise<Response> => {
        const runner = getConnection().createQueryRunner();
        await runner.connect();

        try {

            await runner.startTransaction();
            let librosIds: number[] = [];

            const libros = [
                { isbnTipo: 'tapa_dura', nombre: 'Matematicas 1', editorial: 'Google', edicion: 'Estudiantil', fechaPublicacion: new Date().toDateString() },
                { isbnTipo: 'tapa_dura', nombre: 'Matematicas 2', editorial: 'Google', edicion: 'Estudiantil', fechaPublicacion: new Date().toDateString() },
                { isbnTipo: 'tapa_dura', nombre: 'Lenguaje 1', editorial: 'Google', edicion: 'Estudiantil', fechaPublicacion: new Date().toDateString() },
                { isbnTipo: 'tapa_dura', nombre: 'Lenguaje 2', editorial: 'Google', edicion: 'Estudiantil', fechaPublicacion: new Date().toDateString() },
                { isbnTipo: 'tapa_dura', nombre: 'Ciencias 1', editorial: 'Google', edicion: 'Estudiantil', fechaPublicacion: new Date().toDateString() },
                { isbnTipo: 'tapa_dura', nombre: 'Ciencias 2', editorial: 'Google', edicion: 'Estudiantil', fechaPublicacion: new Date().toDateString() },
                { isbnTipo: 'tapa_dura', nombre: 'Historia 1', editorial: 'Google', edicion: 'Estudiantil', fechaPublicacion: new Date().toDateString() },
                { isbnTipo: 'tapa_dura', nombre: 'Historia 2', editorial: 'Google', edicion: 'Estudiantil', fechaPublicacion: new Date().toDateString() },
                { isbnTipo: 'tapa_dura', nombre: 'Musica 1', editorial: 'Google', edicion: 'Estudiantil', fechaPublicacion: new Date().toDateString() },
                { isbnTipo: 'tapa_dura', nombre: 'Musica 2', editorial: 'Google', edicion: 'Estudiantil', fechaPublicacion: new Date().toDateString() },
            ];

            for(let i = 0; i < libros.length; i++) {
                const {libroId} = await runner.manager.save(Libros, {
                    isbnTipo: libros[i].isbnTipo,
                    nombre: libros[i].nombre,
                    editorial: libros[i].editorial,
                    edicion: libros[i].edicion,
                    fechaPublicacion: libros[i].fechaPublicacion,
                });
                librosIds.push(libroId);
            }

            for(let i = 0; i < librosIds.length; i++){
                console.log(`Id de nuevo libro: ${librosIds[i]}`);
            }
            
            // por cada libro se generaran 5 ejemplares.
            for(let i = 0; i < 5; i++) {
                for(let i = 0; i < librosIds.length; i++){
                    // crear variable que aumente en base a la iteracion para asignar distintos isbn a cada ejemplar.
                    const { ejemplarId } = await runner.manager.save(Ejemplar, {
                        libroId: librosIds[i],
                        trabajoId: null,
                        revistaId: null,
                        estado: 'DISPONIBLE',
                        isbn: Math.floor(Math.random() * 1000000),
                        fechaDevolucion: null,
                        fechaEntrega: null,
                        fechaFin: null,
                    });
                }
            }

            // por cada libro generar la relacion libro stock.
            for(let i = 0; i < librosIds.length; i++){
                const { libroStockId } = await runner.manager.save(LibroStock, {
                    libroId: librosIds[i],
                    total: 5,
                    enBiblioteca: 5,
                    enPrestamo: 0,
                    enAtraso: 0,
                });
            }

            await runner.commitTransaction();

            return res.sendStatus(200);

        } catch (err: any) {
            await runner.rollbackTransaction();
            console.error(err);
            return res.status(500).json({ error: err.message });
        } finally {
            await runner.release();
        }
    };





    // funcion para gnerar prestamos.
    generarPrestamo = async (req: Request, res: Response): Promise<Response> => {
        
        // Para generar el prestamo debo tener las fechas de cada ejemplar
        // el prestamo tendra 3 ejemplares. mat, leng, ciencias.
        const runner = getConnection().createQueryRunner();
        await runner.connect();
        try {

            await runner.startTransaction();


            // ejemplar de leng, mar, ciencias

            const prestamosRepository = getRepository(Prestamos);

            // alumno que genera el prestamo.
            const alumnoId = 1; // Daniel Muñoz
            // usuario que genera el prestamo.
            const usuarioId = 2; // Francisco Berwart

            // libro que se presta.
            const matId = 37; // Matematicas 1
            const lengId = 39; // Lenguaje 1
            const cienId = 41; // Ciencias 1

            // obtener 1 ejemplar por cada libro.
            const matEjemplar = await getRepository(Ejemplar).findOne({
                where: {
                    libroId: matId,
                },
            });
            const lengEjemplar = await getRepository(Ejemplar).findOne({
                where: {
                    libroId: lengId,
                },
            });
            const cienEjemplar = await getRepository(Ejemplar).findOne({
                where: {
                    libroId: cienId,
                },
            });

            // crear prestamo.





            // se crea el prestamo.
            const { prestamoId } = await runner.manager.save(Prestamos, {
                alumnoId,
                usuarioId,
                fechaInicio: new Date().toDateString(),

            });




            







            await runner.commitTransaction();

            return res.sendStatus(200);

        } catch (err: any) {
            await runner.rollbackTransaction();
            console.error(err);
            return res.status(500).json({
                message: err.message
            });
        } finally {
            await runner.release();
        }
            
    }


    

}