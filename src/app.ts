import express, { Express } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import { auth } from './middlewares';
import FlowTask from './jobs/cronTab';
import {
  baseRoutes,
  demoRoutes,
  userRoutes,
  authRoutes,
  booksRoutes,
  prestamosRoutes,
  studentsRoutes,
  uploadersRoutes,
  rankingsRoutes,
} from './routes';

/**
 * @constant {Express} app
 * @description Instancia de express
 * @see {@link https://expressjs.com/en/api.html#express}
 */
const app: Express = express();

// Configuraciones y Middlewares
if (process.env.SERVER_ENVIRONMENT === 'DEVELOPMENT') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(bodyParser.json());
app.use(auth);

// Rutas del servidor.
app.use('/api', baseRoutes);
app.use('/api', demoRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', booksRoutes);
app.use('/api', prestamosRoutes);
app.use('/api', studentsRoutes);
app.use('/api', uploadersRoutes);
app.use('/api', rankingsRoutes);


// CronTab configurado para ejecutarse cada 30 segundos.
if (process.env.SERVER_ENVIRONMENT === 'PRODUCTION') {
  app.use(FlowTask);
}


export default app;
