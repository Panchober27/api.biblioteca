
import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';

import { Prestamos, Libros, PrestamosLibros } from '../entities';

export class PrestamosController {
    /**
     * @function getPrestamos
     * @param req 
     * @param res 
     * @returns {Response} Listado de prestamos, con usuario, alumno y libros asociados.
     */
    getPrestamos = async (req: Request, res: Response): Promise<Response> => {
        let prestamos: any[];

        // en el caso de usar filtros, debemos revisar como agrgar los parametros a la url!
        // ñps filtros podrian ser: las fechas, el estado, el usuario, el alumno, el libro, etc.

        try {
            prestamos = await getRepository(Prestamos).createQueryBuilder("p")
                .leftJoinAndSelect("p.usuario", "u")
                .leftJoinAndSelect("p.alumno", "a")
                .leftJoinAndSelect("a.carrera", "c")
                .leftJoinAndSelect("c.facultad", "f")
                .leftJoinAndSelect("p.prestamosLibros", "pl")
                .leftJoinAndSelect("pl.libro", "l")
                .getMany();

            if (prestamos.length === 0) {
                return res.status(204).json({
                    status: false,
                    message: "No hay prestamos registrados"
                });
            }

            // filtrar informacion de los usuarios, solo mostrar el usuario, nombre, apellido, usuarioMail
            // si no se filtran muestra la password, eso nica!
            prestamos.forEach(prestamo => {
                prestamo.usuario = {
                    usuarioId: prestamo.usuario.usuarioId,
                    usuario: prestamo.usuario.usuario,
                    nombre: prestamo.usuario.nombre,
                    apellido: prestamo.usuario.apellido,
                    usuarioMail: prestamo.usuario.usuarioMail
                }
            });

        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).send(prestamos);
    }

    /**
     * @function insertPrestamo
     * @param {Object} Request  
     * @returns {Response} status 200 | 500
     */
    insertPrestamo = async (req: Request, res: Response) => {
        // en el caso de los libros sera un arreglo con los id's de los libros.
        const { librosId = [1] } = req.body;
        const runner = getConnection().createQueryRunner();
        await runner.connect();
        try {
            await runner.startTransaction();
            // obtener los libros en base a los ids
            const libros: Libros[] = await getRepository(Libros).findByIds(librosId);
            const { prestamoId } = await runner.manager.save(
                runner.manager.create(Prestamos,
                    {
                        alumnoId: 3,
                        usuarioId: 5,
                        fechaInicio: '2020-01-01',
                        fechaFin: '2020-01-01',
                        fechaEntrega: '2020-01-01',
                        estado: 'EN_PRESTAMO_VIGENTE'
                    }
                )
            );
            // ingresar los libros a la relacion de prestamos_libros
            await Promise.all(
                librosId.map(async (libroId) => {
                    await runner.manager.save(
                        runner.manager.create(PrestamosLibros,
                            {
                                prestamoId,
                                libroId
                            }
                        )
                    )
                })
            );
            // Actualizar (update) el stock de cada libro restando 1
            await Promise.all(
                libros.map(async (libro) => {
                    await runner.manager.update(
                        Libros,
                        libro.libroId,
                        {
                            stock: libro.stock - 1
                        }
                    )
                })
            );

            await runner.commitTransaction();
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        } finally {
            await runner.release();
        }
        return res.status(200).json({ message: 'exito' });
    }


}