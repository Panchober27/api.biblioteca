

// /**
//  * @file index.js Archivo principal de la aplicación dasjdljadj dasjdljadjdasjdljadjdasjdljadjdasjdljadjdasjdljadj dasjdljadj dasjdljadjdasjdljadj dasjdljadj
//  * dasjdljadjdasjdljadjdasjdljadjdasjdljadjdasjdljadjdasjdljadj dasjdljadjdasjdljadjdasjdljadj dasjdljadj dasjdljadj PANCHO
//  * @author Francisco Berwart
//  */


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
