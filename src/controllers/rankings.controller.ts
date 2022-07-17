import express, { Express, Request, Response } from 'express';
import { Alumnos, Ejemplar, Libros, PrestamoEjemplar, Prestamos } from '../entities';
import { getRepository } from 'typeorm';


export class RankingController {


    // Funcion para obtener la cantidad de veces que un libro fue prestado en un plazo de 1 mes.
    getCountLibroPrestadoXMes = async (req: Request, res: Response): Promise<Response> => {

        // recibo por body la entidad a la que se esta consultando.
        const { libroId, fechaInicio, fechaFin } = req.body;

        !libroId || !fechaInicio || !fechaFin ? res.status(400).send('Faltan datos') : null;

        const prestamosRepository = getRepository(Prestamos);

        try {
            // format de fecha para la consulta.
            // 2016-02-19

            // count = cantidad prestamos a los que el libro esta asociado.
            const count = await prestamosRepository.createQueryBuilder('p')
                .leftJoinAndSelect('p.prestamoEjemplars', 'pe')
                .leftJoinAndSelect('pe.ejemplar', 'e')
                .leftJoinAndSelect('e.libro', 'l')
                .where('l.libroId = :libroId', { libroId })
                // .andWhere('p.fechaInicio BETWEEN :fechaInicio AND :fechaFin', { fechaInicio, fechaFin })
                // .andWhere('p.fechaInicio BETWEEN :fechaInicio AND :fechaFin', { fechaInicio, fechaFin })
                .getCount();

            if (count <= 0) {
                console.log(count);
                return res.sendStatus(204)
            }

            // dividir count en 4 (por semanas) = const weekCount
            // generar array con objetos para graficos.
            // const data = { id: (auto_incrementNumber), weekCount: weekCount, week: (['semana 1', 'semena 2', 'semana 3', 'semena 4']) }
            const weekCount = count / 4;
            let data: any[] = [];

            for (let i = 0; i < 4; i++) {
                data.push({
                    id: i,
                    weekCount: weekCount,
                    week: `semana ${i + 1}`
                });
            }

            console.log(count);
            return res.send({
                libroId,
                fechaInicio,
                fechaFin,
                count,
                weekCount,
                data
            });

        } catch (err: any) {
            return res.status(500).json({
                message: err.message,
            });
        }

    }





    // funcion para obtener los prestamos atrasados y sacarles datos para metricas.

    // TODO: 
    // crear muchos mas, siguiendo la misma logica.
    // y obtener las carreras en un arreglo (contarlas en base a su aparicion)
    // aramar objeto para graficos en frontend.
    getAtrasadosData = async (req: Request, res: Response) => {
        const prestamosRepository = getRepository(Prestamos);

        try {
            const prestamosAtrasados = await prestamosRepository.createQueryBuilder('p')
                .leftJoinAndSelect('p.alumno', 'a')
                .leftJoinAndSelect('a.carrera', 'carr')
                .where('p.estado = :estado', { estado: 'FINALIZADO_ATRASADO'})
                .getMany();

            if(!prestamosAtrasados || prestamosAtrasados.length === 0){
                return res.send('no hay prestamos con esas caracteristicas.');
            }

            return res.send(prestamosAtrasados);
            
        } catch (err: any) {
            console.log(err);
            return res.sendStatus(500).send({error: err.message});
        }
    };







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
                .leftJoinAndSelect('p.alumno', 'a')
                .leftJoinAndSelect('a.carrera', 'c')
                .leftJoinAndSelect('c.facultad', 'f')
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
                .leftJoinAndSelect('e.libro', 'li')
                .where('e.estado = "PRESTADO"')
                //hacer el leftjoin a la tabla preejemplar a la tabla prestamo y de prestamo a alumno.
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