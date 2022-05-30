
// import { Request, Response } from 'express';
// import { getRepository, Repository, getManager, getConnection } from 'typeorm';

// import { Prestamos, Libros, PrestamosLibros } from '../entities';

// export class PrestamosController {
//     /**
//      * @function getPrestamos
//      * @param req
//      * @param res
//      * @returns {Response} Listado de prestamos, con usuario, alumno y libros asociados.
//      */
//     getPrestamos = async (req: Request, res: Response): Promise<Response> => {
//         let prestamos: any[];

//         // en el caso de usar filtros, debemos revisar como agrgar los parametros a la url!
//         // ñps filtros podrian ser: las fechas, el estado, el usuario, el alumno, el libro, etc.

//         try {
//             prestamos = await getRepository(Prestamos).createQueryBuilder("p")
//                 .leftJoinAndSelect("p.usuario", "u")
//                 .leftJoinAndSelect("p.alumno", "a")
//                 .leftJoinAndSelect("a.carrera", "c")
//                 .leftJoinAndSelect("c.facultad", "f")
//                 .leftJoinAndSelect("p.prestamosLibros", "pl")
//                 .leftJoinAndSelect("pl.libro", "l")
//                 .getMany();

//             if (prestamos.length === 0) {
//                 return res.status(204).json({
//                     status: false,
//                     message: "No hay prestamos registrados"
//                 });
//             }

//             // filtrar informacion de los usuarios, solo mostrar el usuario, nombre, apellido, usuarioMail
//             // si no se filtran muestra la password, eso nica!
//             prestamos.forEach(prestamo => {
//                 prestamo.usuario = {
//                     usuarioId: prestamo.usuario.usuarioId,
//                     usuario: prestamo.usuario.usuario,
//                     nombre: prestamo.usuario.nombre,
//                     apellido: prestamo.usuario.apellido,
//                     usuarioMail: prestamo.usuario.usuarioMail
//                 }
//             });

//         } catch (err: any) {
//             console.error(err);
//             return res.status(500).json({ error: err.message });
//         }
//         return res.status(200).send(prestamos);
//     }

//     /**
//      * @function insertPrestamo
//      * @param {Object} Request
//      * @returns {Response} status 200 | 500
//      */
//     insertPrestamo = async (req: Request, res: Response): Promise<Response> => {
//         // en el caso de los libros sera un arreglo con los id's de los libros.
//         // const { librosId = [1] } = req.body;

//         const {
//             alumnoId,
//             usuarioId,
//             fechaInicio,
//             fechaFin,
//             fechaEntrega,
//             estado,
//             librosIds
//         } = req.body;



//         const runner = getConnection().createQueryRunner();
//         await runner.connect();
//         try {
//             await runner.startTransaction();
//             // obtener los libros en base a los ids | esto quizas validarlo en el fronend??
//             const libros: Libros[] = await getRepository(Libros).findByIds(librosIds);

//             // 1era Validacion: verificar que el alumno no tenga prestamos activos.
//             const prestamosActivos = await getRepository(Prestamos).find({
//                 where: {
//                     alumnoId: alumnoId,
//                     estado: "EN_PRESTAMO_VIGENTE" || "EN_PRESTAMO_RETRASO"
//                 }
//             });
//             if (prestamosActivos.length > 0) {
//                 return res.status(400).json({
//                     status: false,
//                     message: "El alumno ya tiene prestamos activos"
//                 });
//             }


//             // PROBAR ESTA!
//             // 2da Validacion: verificar que los libros tengan como stock minimo 1.
//             // iterar los id's de libros en librosIds y verificar que el stock sea mayor a 0.
//             // si no es asi, no se puede hacer el prestamo.
//             libros.forEach(l => {
//                 if (l.stock < 1) {
//                     return res.status(400).json({
//                         status: false,
//                         message: "No hay stock suficiente para el libro: " + l.nombre
//                     });
//                 }
//             });



//             // Ingreso de prestamo, una vez validado todo!
//             const { prestamoId } = await runner.manager.save(
//                 runner.manager.create(Prestamos,
//                     {
//                         alumnoId,
//                         usuarioId,
//                         fechaInicio,
//                         fechaFin,
//                         fechaEntrega, // debemos usar logica para generar este campo!!!
//                         estado,
//                     }
//                 )
//             );
//             // ingresar los libros a la relacion de prestamos_libros
//             await Promise.all(
//                 librosIds.map(async (libroId) => {
//                     await runner.manager.save(
//                         runner.manager.create(PrestamosLibros,
//                             {
//                                 prestamoId,
//                                 libroId
//                             }
//                         )
//                     )
//                 })
//             );
//             // Actualizar (update) el stock de cada libro restando 1
//             await Promise.all(
//                 libros.map(async (libro) => {
//                     await runner.manager.update(
//                         Libros,
//                         libro.libroId,
//                         {
//                             stock: libro.stock - 1
//                         }
//                     )
//                 })
//             );

//             await runner.commitTransaction();
//         } catch (err: any) {
//             console.error(err);
//             return res.status(500).json({ error: err.message });
//         } finally {
//             await runner.release();
//         }
//         return res.status(200).json({ message: 'exito' });
//     }



//     /**
//      * Esta funcion es para realizar las DEVOLUCIONES de los prestamos!
//      *
//      * @function updatePrestamo
//      * @param req
//      * @param res
//      * @returns
//      */
//     updatePrestamo = async (req: Request, res: Response): Promise<Response> => {

//         // para las peticiones de tipo PUT (edits)
//         // se envia el id de la entidad a editar a traves de la url, revisen el archivo prestamos.routes.ts

//         try {

//             const { id } = req.params;

//             return res.send(`web service para editar prestamo/ devolucion. id recibido: ${id}`);
//         } catch (err: any) {
//             console.error(err);
//             return res.status(500).json({ error: err.message });
//         }

//     }


// }