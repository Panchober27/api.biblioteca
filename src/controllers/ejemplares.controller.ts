import {Request, Response} from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import { Prestamos, Libros, PrestamoEjemplar, Trabajos, Revistas } from '../entities';

export class EjemplaresController {

    getPrestamosOfStudent = (req: Request, res: Response) => {
    }
    


}