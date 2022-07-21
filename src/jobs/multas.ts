import moment from 'moment';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import { Ejemplar, Libros, PrestamoEjemplar, Trabajos, Revistas, LibroStock, RevistaStock, TrabajoStock, Prestamos, Alumnos } from '../entities';

export class Multas {


    demoMultas = () => {
        console.log('Demo Multas');
    };

    multarAlumnos = async () => {
        const runner = getConnection().createQueryRunner();
        await runner.connect();
        let alumnosMultadosCount = 0;

        try {
            //Ponemos a "Dormir" el programa durante los ms que queremos
            // setTimeout(() => {
            //     console.log("Hola Mundo");
            // }, 2000);
            await runner.startTransaction();

            const alumnosRepo = getRepository(Alumnos);

            // realizar una consuta que busque a todos los alumnos con mas de 2 prestamos atrasados!
            const alumnosMultados = await alumnosRepo.createQueryBuilder('a')
                .leftJoinAndSelect('a.prestamos', 'p')
                // seleccionar el prestamo donde el estado = ATRASADO o FINALIZADO_ATRASADO
                .where('p.estado IN (:estado1, :estado2)', { estado1: 'ATRASADO', estado2: 'FINALIZADO_ATRASADO' })
                .andWhere('p.fecha_fin < NOW()')
                .andWhere('MONTH(p.fecha_fin) = MONTH(NOW())')
                .getMany();

            if (!alumnosMultados || alumnosMultados.length === 0) {
                console.log('No hay alumnos multados');
            }

            // Se cambian a multado los alumnos, pero los prestamos asociados se debe
            // hacer de manera independiente!
            alumnosMultados.forEach(async alumno => {
                alumnosMultadosCount++;
                await runner.manager.update(Alumnos,
                    { alumnoId: alumno.alumnoId },
                    { alumnoActivo: false }
                );
            });

            console.log(`Total de alumnos multados: ${alumnosMultadosCount}, por CronTab🐱‍👤`);
            await runner.commitTransaction();

        } catch (err: any) {
            await runner.rollbackTransaction();
            console.log(err);
        } finally {
            await runner.release();
        }


    }



}