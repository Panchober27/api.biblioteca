require('dotenv').config();
import app from './app';
import { connect } from './database';

// Configuracion de puerto para la aplicacion.
const port: number | string = process.env.APP_PORT || 8000;

// iniciar conexion a base de datos.
connect();

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
