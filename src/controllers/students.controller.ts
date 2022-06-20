import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import {
    Alumnos,
} from '../entities';
export class StudentsController {


    getStudents = async (req: Request, res: Response) => {
        try {

            // filtros para busqueda de estudiantes.
            const { nombreAlumno } = req.params;


            const userLogged = req.user;
            console.log(userLogged);

            const studentsRepository = getRepository(Alumnos);
            const alumnosQuery = studentsRepository.createQueryBuilder('a')
                .leftJoinAndSelect('a.prestamos', 'prestamos')
                .innerJoinAndSelect('a.carrera', 'carr')
                .innerJoinAndSelect('carr.facultad', 'fac')
                .leftJoinAndSelect('prestamos.prestamoEjemplars', 'prestamoEjemplars')
                .leftJoinAndSelect('prestamoEjemplars.ejemplar', 'ejemplar')
                .leftJoinAndSelect('ejemplar.libro', 'libro')
                .leftJoinAndSelect('ejemplar.revista', 'revista')
                .leftJoinAndSelect('ejemplar.trabajo', 'trabajo')

            if (nombreAlumno) {
                console.log(`nombreAlumno: ${nombreAlumno}`);
                alumnosQuery.andWhere(' a.nombreAlumno LIKE :nombreAlumno', {
                    nombreAlumno: `%${nombreAlumno}%`,
                });
            }

            const alumnos = await alumnosQuery.getMany();



            if (!alumnos || alumnos.length === 0) {
                return res.status(404).json({ message: 'No se encontraron alumnos' });
            }

            return res.status(200).json(alumnos);

        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    }



    /**
     * @function findStudent
     * Funcion para encontrar un alumno en un sistema de busqueda.
     */
    findStudent = async (req: Request, res: Response) => {
    }

}