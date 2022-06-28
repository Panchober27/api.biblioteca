import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import { Ejemplar, Libros, PrestamoEjemplar, Trabajos, Revistas, LibroStock, RevistaStock, TrabajoStock } from '../entities';

export class DemoController {



    /**
     * Funcion para obtener un listado con libros, revistas, trabajos.
     * basados en que tengan ejemplares con stock valido en bilbioteca.
     * 
     * Formular de mejor manera este algoritmo.
     * 
     * @function getLibrosRevTrab 
     * @param req 
     * @param res 
     */
    getLibrosRevTrab = async (req: Request, res: Response) => {
        try {
            // obtener libros, revistas, trabajos cuyos stocks no esten agotados.
            const librosRepo = getRepository(Libros);
            const revistasRepo = getRepository(Revistas);
            const trabajosRepo = getRepository(Trabajos);

            // revisar que el valor enBiblioteca de [revistaStock, trabajoStock, libroStock] sea mayor a 0.
            const libros = await librosRepo.createQueryBuilder('l')
                // .leftJoinAndSelect(' l.ejemplars', 'e')
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


    /**
   * Funcion para crear un nuevo libro y 5 ejemplares de este, mas libroStock
   * 
   */
    addLibroSSS = async (req: Request, res: Response) => {
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
                nombre: 'AAAA',
                isbn: '8946AAAA',
                isbnTipo: 'TAPA DURA',
                editorial: 'Editorial aaaaa',
                edicion: 'Edicion de asasasasas',
                fechaPublicacion: new Date().toString()
            });


            // TODO: Loopear y manejar esto para generar mas de un ejemplar de este libro con datos random.
            const cantidadEjemplares = 3;
            for (let i = 0; i < cantidadEjemplares; i++) {
                // crear un nuevo ejemplar
                const { ejemplarId } = await runner.manager.save(Ejemplar, {
                    libroId: libroId,
                    trabajoId: null,
                    revistaId: null,
                    estado: 'DISPONIBLE',
                    isbn: 222 + (i++),
                    fechaDevolucion: null,
                    fechaEntrega: null,
                    fechaFin: null,
                });
                console.log(`crado ejemlar con id: ${ejemplarId}`);
            };

            // crear un nuevo libroStock
            const { libroStockId } = await runner.manager.save(LibroStock, {
                libroId: libroId,
                total: 3,
                enBiblioteca: 3,
                enPrestamo: 0,
                enAtraso: 0,
            });


            await runner.commitTransaction();


        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        } finally {
            await runner.release();
        }

        // Funcion ejecutada sin problemas.
        res.status(200).send({
            message: 'Libro y 4 ejemplares creados.'
        });

    };


    // Funcion para a{adir uno o mas ejemplares de un libro(ya creado)
    addEjemplaresToBook = async (req: Request, res: Response) => {
        const libroId = 0; // hardcodear.

        // usar transacciones.
        const runner = getConnection().createQueryRunner();
        await runner.connect();

        try {

            await runner.startTransaction();

            // crear un nuevo ejemplar
            const { ejemplarId } = await runner.manager.save(Ejemplar, {
                libroId: libroId,
                trabajoId: null,
                revistaId: null,
                estado: 'DISPONIBLE',
                isbn: 222,
                fechaDevolucion: null,
                fechaEntrega: null,
                fechaFin: null,
            });
            console.log(`crado ejemlar con id: ${ejemplarId}`);

            // crear un nuevo libroStock
            // const { libroStockId } = await runner.manager.save(LibroStock, {
            //     libroId: libroId,
            //     total: 3,
            //     enBiblioteca: 3,
            //     enPrestamo: 0,
            //     enAtraso: 0,
            // });

            await runner.commitTransaction();

        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        } finally {
            await runner.release();
        }

    }

}