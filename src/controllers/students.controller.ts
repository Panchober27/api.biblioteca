import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import {
    Alumnos,
} from '../entities';
export class StudentsController {


    /**
     * @global
     * @function getStudents
     * @description Función que permite obtener todos los alumnos.
     * @returns {Array<Alumnos>} Array de objetos con los alumnos.
     */
    getStudents = async (req: Request, res: Response) => {
        try {
            // filtros para busqueda de estudiantes.
            const { nombreAlumno, isAdmin = false } = req.query;
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
            // if (isAdmin == false) {
            //     alumnosQuery.where('a.alumnoActivo = :alumnoActivo', { alumnoActivo: true })
            // }
            if (nombreAlumno) {
                // console.log(`nombreAlumno: ${nombreAlumno}`);
                alumnosQuery.andWhere(' a.nombreAlumno LIKE :nombreAlumno', {
                    nombreAlumno: `%${nombreAlumno}%`,
                });
            }
            // if(!req.user){
            //     console.log('No hay usuario loggeado');
            // }
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




    getAllStudents = async (req: Request, res: Response) => {
        try {
            const studentsRepo = getRepository(Alumnos);
            const students = await studentsRepo.find();

            if (!students || students.length === 0) {
                return res.status(404).json({ message: 'No se encontraron alumnos' });
            }
            return res.status(200).send(students);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    }


    findStudent = async (req: Request, res: Response) => {
    }

}