import {Request, Response} from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import { Ejemplar, Libros, PrestamoEjemplar, Trabajos, Revistas } from '../entities';

export class EjemplaresController {


    getEjemplares = async (req: Request, res: Response) => {
        const ejemplaresRepo = getRepository(Ejemplar);
        const ejemplaresQuery = ejemplaresRepo.createQueryBuilder('e')
            .leftJoinAndSelect('e.libro', 'l')
            .leftJoinAndSelect('l.libroStocks', 'ls')
            .leftJoinAndSelect('e.trabajo', 't')
            .leftJoinAndSelect('t.trabajoStocks', 'ts')
            .leftJoinAndSelect('e.revista', 'r')
            .leftJoinAndSelect('r.revistaStocks', 'rs');

            // se podrian añadir filtros para la consulta.


        const ejemplares = await ejemplaresQuery.getMany();

        ejemplares.length === 0 ? res.sendStatus(204) : res.status(200).json(ejemplares);
    }

    getPrestamosOfStudent = (req: Request, res: Response) => {
    }
    


}