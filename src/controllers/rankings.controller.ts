import express, { Express, Request, Response } from 'express';
import { Alumnos, Ejemplar, Libros, PrestamoEjemplar, Prestamos } from '../entities';
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
    // traer todos los prestamos que estan en estado prestado
    getPrestado = async (req: Request, res: Response) => {

        try {

            // repo de alumnos, consultar los que estan en alumno_activo == 0
            const prestamoRepository = getRepository(Prestamos);

            const prestamos = await prestamoRepository.createQueryBuilder('p')
                .leftJoinAndSelect('p.alumno','a')
                .leftJoinAndSelect('a.carrera','c')
                .leftJoinAndSelect('c.facultad','f')
                .getMany();

            if (!prestamos || prestamos.length === 0) return res.send({ message: 'No hay prestamos' });
            
            // validar que todos los alumnos tengan al menos 1 prestamo generado.

            return res.send(prestamos);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

    }
    //1. traer prestamos donde la fecha sea = xxxx-xx-xx
    //2. traer ejemplares que esten en estado prestado (asociar libros en el prestamo)
    //1.1 las fechas declaralas asi.
    getEjemplaresPrestado = async (req: Request, res: Response) => {

        try {

            // repo de alumnos, consultar los que estan en alumno_activo == 0
            const EjemplaresRepository = getRepository(Ejemplar);

            const ejemplar = await EjemplaresRepository.createQueryBuilder('e')
                .leftJoinAndSelect('e.libro','li')
                .where('e.estado = "PRESTADO"')
                .getMany();

            if (!ejemplar || ejemplar.length === 0) return res.send({ message: 'No hay ejemplares prestados' });
            
            // validar que todos los alumnos tengan al menos 1 prestamo generado.

            return res.send(ejemplar);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

    }


}