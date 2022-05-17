
import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';

import { Prestamos, Libros, PrestamosLibros } from '../entities';

export class PrestamosController {
    getPrestamos = async (req: Request, res: Response) => {
    }

    insertPrestamo = async (req: Request, res: Response) => {
        const { } = req.body;

        const runner = getConnection().createQueryRunner();
        await runner.connect();


        try {
            await runner.startTransaction();

            const { prestamoId } = await runner.manager.save(
                runner.manager.create(Prestamos,
                    {
                        alumnoId: 3,
                        usuarioId: 5,
                        fechaInicio: '2020-01-01',
                        fechaFin: '2020-01-01',
                        fechaEntrega: '2020-01-01',
                    }
                )
            )
            // quiero ingresar un libro al prestamo, prestamos_libros
            await runner.manager.save(
                runner.manager.create(PrestamosLibros,
                    {
                        prestamoId: prestamoId,
                        libroId: 1,
                    }
                ))


            await runner.commitTransaction();

        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        } finally {
            await runner.release();
        }

        return res.status(200).json({message: 'exito'});

    }


}