import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import { Ejemplar, Libros, PrestamoEjemplar, Trabajos, Revistas, LibroStock, RevistaStock, TrabajoStock } from '../entities';


/**
 * Web service para los prestamos
 * @module EjemplaresController
 * @memberof module:controllers
 */

export class EjemplaresController {


    /**
     * @function getEjemplares
     * @description Función que permite obtener los libros y sus ejemplares, cuando los ejemplares estan disponibles.
     * @returns {Array<Libros>} Array de objetos con los libros y sus ejemplares.
     */
    getEjemplares = async (req: Request, res: Response) => {
        try {
            // obtener libros, revistas, trabajos cuyos stocks no esten agotados.
            const librosRepo = getRepository(Libros);
            const revistasRepo = getRepository(Revistas);
            const trabajosRepo = getRepository(Trabajos);

            // revisar que el valor enBiblioteca de [revistaStock, trabajoStock, libroStock] sea mayor a 0.
            const libros = await librosRepo.createQueryBuilder('l')
                .innerJoinAndSelect('l.ejemplars', 'e')
                .leftJoinAndSelect('l.libroStocks', 'ls')
                .where('ls.enBiblioteca > 0')
                .andWhere('e.estado = :estado', { estado: 'DISPONIBLE' })
                .getMany();

            // const revistas = await revistasRepo.createQueryBuilder('r')
            //     .leftJoinAndSelect('r.ejemplars', 'e')
            //     .leftJoinAndSelect('r.revistaStocks', 'rs')
            //     .where('rs.enBiblioteca > 0')
            //     .getMany();
            // const trabajos = await trabajosRepo.createQueryBuilder('t')
            //     .leftJoinAndSelect('t.ejemplars', 'e')
            //     .leftJoinAndSelect('t.trabajoStocks', 'ts')
            //     .where('ts.enBiblioteca > 0')
            //     .getMany();
            // const librosRevTrab = [...libros, ...revistas, ...trabajos];

            const librosRevTrab = [...libros];

            librosRevTrab.length === 0 ? res.sendStatus(204) : res.status(200).json(librosRevTrab);

        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

    };



    getPrestamosOfStudent = (req: Request, res: Response) => {
    }






 
    addLibro = async (req: Request, res: Response) => {
        // insert para un nuevo libro.
        // 1- registro en libro.
        // 2- registro en ejemplar.
        // 3- registro en libroEjemplar
        // 4- registro en libroStock (corresponde a la cantidad de ejemplares. por libro!)
        //     4.1 - el registro de stocks debe ser asi.
        //         - en enBiblioteca colocar la canntiad de ejemplares. registrados.
        
        // usar transacciones.
        const runner = getConnection().createQueryRunner();
        await runner.connect();

        try {

            await runner.startTransaction();


            // primero crear el libro recupeando el id desestructurando el objeto.
            const { libroId } = await runner.manager.save(Libros, {
                nombre: 'Libro de prueba',
                isbn: '123456789',
                isbnTipo: 'TAPA DURA',
                editorial: 'Editorial de prueba',
                edicion: 'Edicion de prueba',
                fechaPublicacion: new Date().toString()
            });


            // TODO: Loopear y manejar esto para generar mas de un ejemplar de este libro con datos random.
            // crear un nuevo ejemplar
            const { ejemplarId } = await runner.manager.save(Ejemplar, {
                libroId: libroId,
                trabajoId: null,
                revistaId: null,
                estado: 'DISPONIBLE',
                isbn: 12345,
                fechaDevolucion: null,
                fechaEntrega: null,
                fechaFin: null,
            });

            // crear un nuevo libroStock
            const { libroStockId } = await runner.manager.save(LibroStock, {
                libroId: libroId,
                total: 1,
                enBiblioteca: 1,
                enPrestamo: 0,
                enAtraso: 0,
            });


            await runner.commitTransaction();

            console.log(`libro: ${libroId} ejemplar: ${ejemplarId} libroStock: ${libroStockId}`);

        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        } finally {
            await runner.release();
        }

        // Funcion ejecutada sin problemas.
        res.sendStatus(200);

    };




  


}