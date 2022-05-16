import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { auth } from './middlewares';
import FlowTask from './jobs/cronTab';
import {
  userRoutes,
  authRoutes,
  booksRoutes,
} from './routes';

const app: Express = express();

// Configuraciones y Middlewares
app.use(cors());
app.use(bodyParser.json());
// app.use(auth);

// Rutas del servidor.
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', booksRoutes);


// CronTab configurado para ejecutarse cada 30 segundos.
// app.use(FlowTask);

export default app;
