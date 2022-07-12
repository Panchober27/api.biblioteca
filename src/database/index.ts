import { createConnection } from 'typeorm';

/**
 * @function createConnection
 * @description Función que permite crear la conexión a la base de datos.
 * @returns {Promise<Connection>}
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
