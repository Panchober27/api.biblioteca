import { createConnection } from 'typeorm';

/**
 * Función que conecta base de datos
 */
const connect = async () => {
  try {
    const connection = await createConnection();

    if (connection.isConnected) {
      console.log('Base de datos conectada');
    }
  } catch (e: any) {
    console.error(`Ocurrio un error al conectar base de datos => ${e.message}`);
  }
};

export { connect };
