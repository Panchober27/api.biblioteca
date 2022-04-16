// Archivo de configuracion de cronTab.js
// Language: typescript
// Path: src\jobs\cronTab.ts
import mjml2html from 'mjml';
import { getRepository } from 'typeorm';
import { User } from '../entities';
import { NodeMailer } from './mailer';
const cron = require('node-cron');

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
 * @returns Status de ejecucion
 */
const FlowTask = async () => {
  const mailer = new NodeMailer(); // instancia de nodemailer
  const usersRepo = getRepository(User); // repo de usuarios para obtener su o sus correos.
  let toAddresses = null; // direcciones de correo a enviar
   
};

// Si el ambiente del servidor es produccion se ejecuta el cronTab.
if (serverEnvironment === 'PRODUCTION') {
  task.start();
}

export default FlowTask;
