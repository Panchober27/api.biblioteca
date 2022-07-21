// Archivo de configuracion de cronTab.js
// Language: typescript
// Path: src\jobs\cronTab.ts
import mjml2html from 'mjml';
import { getRepository, getConnection } from 'typeorm';
import { Usuarios, Prestamos, Ejemplar } from '../entities';
import { NodeMailer } from './mailer';
const cron = require('node-cron');

import { Multas } from './multas';


/**
 * @module CronTabs
 * @description CronTab para distintas tareas.
 */


const multas = new Multas();


const serverEnvironment: string =
  process.env.SERVER_ENVIRONMENT || 'PRODUCTION';

const task = cron.schedule(
  '*/30 * * * * *',
  () => {
    FlowTask();
  },
  { scheduled: false }
);



/**
 * @function FlowTask
 * @description Tarea que se ejecuta cada 30 segundos.
 */
const FlowTask = async () => {
  // const mailer = new NodeMailer(); // instancia de nodemailer
  // const usersRepo = getRepository(Usuarios); // repo de usuarios para obtener su o sus correos.
  // let toAddresses = null; // direcciones de correo a enviar
  // console.log('SOY UN CRONTAB 💖');
  // let updatedPrestamos = 0;
  // const runner = getConnection().createQueryRunner();
  // await runner.connect();
  try {
  //   const prestmamosRepo = getRepository(Prestamos);
  //   const prestamosAtrasados = await prestmamosRepo.createQueryBuilder('p')
  //     .leftJoinAndSelect('p.prestamoEjemplars', 'pe')
  //     .leftJoinAndSelect('pe.ejemplar', 'e')
  //     .where('p.fecha_fin < NOW()')
  //     .andWhere('p.estado = :estado', { estado: 'PRESTADO' })
  //     .getMany();
  //   if (!prestamosAtrasados || prestamosAtrasados.length === 0) {
  //     console.log('No hay prestamos atrasados');
  //   }
  //   await runner.startTransaction();


  //   // // Se cambian a atrasado los prestamos, pero los ejemplares asociados se debe
  //   // // hacer de manera independiente!
  //   prestamosAtrasados.forEach(async prestamo => {
  //     updatedPrestamos++;
  //     await runner.manager.update(Prestamos,
  //       { prestamoId: prestamo.prestamoId },
  //       { estado: 'ATRASADO' }
  //     );
  //   });

  //   await runner.commitTransaction();

  //   const info = {
  //     message: 'Prestamos atrasados',
  //     data: prestamosAtrasados,
  //     updatedPrestamos
  //   };

  //   console.log(`CRONTAB EJECUTADO🐱‍👤✌`);
  //   console.log(info);

  multas.demoMultas();



  } catch (err: any) {
    // await runner.rollbackTransaction();
    console.log(err);
  } finally {
    // await runner.release();
  }

};

// Si el ambiente del servidor es produccion se ejecuta el cronTab.
if (serverEnvironment === 'PRODUCTION') {
  task.start();
}

export default FlowTask;
