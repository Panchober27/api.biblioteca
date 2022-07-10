import express, { Express, Request, Response } from 'express';
import { Alumnos } from '../entities';
import { getRepository } from 'typeorm';


export class RankingController {



    getBadStudents = async (req: Request, res: Response) => {

        try {


            // TODO:
            // 1. Obtener los prestamos de los alumnos con atrasos
            // para esto hacer la consulta a prestamos?


            // repo de alumnos, consultar los que estan en alumno_activo == 0
            const alumnoRepository = getRepository(Alumnos);

            const badStudents = await alumnoRepository.createQueryBuilder('a')
                .leftJoinAndSelect('a.carrera', 'car')
                .leftJoinAndSelect('car.facultad', 'fac')
                .leftJoinAndSelect('a.prestamos', 'p')
                .where('a.alumno_activo = 0')
                // .andWhere(`p.estado = 'FINALIZADO_ATRASADO'`)
                .getMany();

            if (!badStudents || badStudents.length === 0) return res.send({ message: 'No hay alumnos' });
            
            // validar que todos los alumnos tengan al menos 1 prestamo generado.

            return res.send(badStudents);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

    }



}