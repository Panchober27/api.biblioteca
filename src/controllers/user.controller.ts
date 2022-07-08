import crypto from 'crypto';
import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
// import { Usuarios, Permission, UsuariosPerfiles } from '../entities';
import { Usuarios, Permisos, UsuariosPerfiles } from '../entities';

const USER_ALREADY_EXISTS: string = 'USER_ALREADY_EXISTS';
const USER_NOT_EXIST: string = 'USER_NOT_EXIST';
export class UserController {
  /**
   * Función encargada de la creacion de nuevos usuarios.
   * @param req
   * @param res
   * @returns
   */
  async createUser(req: Request, res: Response): Promise<Response> {
    const runner = getConnection().createQueryRunner();
    await runner.connect();

    try {
      const { usuario, nombre, apellido, password, usuario_mail, userType, profileId } = req.body;
      const user = await runner.manager.findOne(
        Usuarios,
        {
          where: { usuario },
        }
      );

      if (user) {
        return res.status(400).json({ status: false, error: USER_ALREADY_EXISTS });
      }

      const userSalt = crypto.randomBytes(16).toString('base64');
      const encryptedPassword = crypto.pbkdf2Sync(password, userSalt, 10000, 64, 'sha1').toString('base64');

      await runner.startTransaction();
      const { usuarioId } = await runner.manager.save(
        runner.manager.create(
          Usuarios, {
          usuario,
          nombre,
          apellido,
          password: encryptedPassword,
          usuarioSalt: userSalt,
          usuarioMail: usuario_mail,
          usuarioTipo: userType,
          usuarioActivo: true,
        })
      );

      // await runner.manager.save(
      //   runner.manager.create(
      //     UsuariosPerfiles, {
      //     usuarioId,
      //     perfilId: profileId,
      //   }
      //   )
      // );

      await runner.commitTransaction();

    } catch (err: any) {
      console.error(err);
      await runner.rollbackTransaction();
      return res.sendStatus(500);
    } finally {
      await runner.release();
    }

    return res.sendStatus(200);
  }

  /**
   * Actualiza datos de usuario seleccionado por id
   * @param req
   * @param res
   */
  async updateUser(req: Request, res: Response): Promise<Response> {
    const runner = getConnection().createQueryRunner();
    await runner.connect();
    console.log(req.body);

    try {
      const { id } = req.params;
      // const { usuario, nombre, apellido, password, usuario_mail, userType, userActive, profileId } = req.body;
      const { usuario, nombre, apellido, password, usuario_mail, userType, userActive } = req.body;

      const user = await runner.manager.findOne(
        Usuarios,
        {
          where: { usuarioId: id },
        }
      );

      if (!user) {
        return res.status(400).json({ status: false, error: USER_NOT_EXIST });
      }

      await runner.startTransaction();


      await runner.manager.update(
        Usuarios,
        { usuarioId: id },
        {
          usuario,
          nombre,
          apellido,
          usuarioMail: usuario_mail,
          usuarioTipo: userType,
          password: password ? crypto.pbkdf2Sync(password, user.usuarioSalt ? user.usuarioSalt : '', 10000, 64, 'sha1').toString('base64') : user.password,
          usuarioActivo: userActive,
        } as Usuarios
      );

      // await runner.manager.delete(UsuariosPerfiles, { usuarioId: id, perfilId: profileId });


      // await runner.manager.save(
      //   runner.manager.create(
      //     UsuariosPerfiles, {
      //     usuarioId: parseInt(id),
      //     perfilId: profileId,
      //   })
      // );

      await runner.commitTransaction();

    } catch (err: any) {
      console.log(err);
      await runner.rollbackTransaction();
      return res.sendStatus(500);
    } finally {
      await runner.release();
    }

    return res.sendStatus(200);

  }

  /**
   * Obtiene listado de todos los usuarios ingresados en base de datos.
   * contiene parametros opcionales, 1 o más permisos.
   * si no trae parametros retornar todos los usuarios.
   * @param req
   * @param res
   */
  async getUsers(req: Request, res: Response) {

    const user_divisions = 1; // esta es o son las divisiones del usuario loggeado
    try {

      console.log('req.user');
      console.log(req.user);

      const { neededPerm } = req.params; // variable para filtrar usuarios por permiso.
      const userRepo = getRepository(Usuarios);

      // Cambiar a consulta que filtre por perfiles que tengan la division del usuario loggeado.
      const users = await userRepo.find();

      // AÑADIR ID DE PERFIL DEL USUARIO
      const userProfileRepo = getRepository(UsuariosPerfiles);
      const userProfiles = await userProfileRepo.find();

      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < userProfiles.length; j++) {
          if (users[i].usuarioId === userProfiles[j].usuarioId) {
            users[i].usuarioId = userProfiles[j].usuarioId;
          }
        }
      }

      let usersList = [] as any;

      usersList = users.map((user) => {
        return {
          usuario_id: user.usuarioId,
          usuario: user.usuario,
          nombre: user.nombre,
          apellido: user.apellido,
          fullName: user.nombre + ' ' + user.apellido,
          usuario_mail: user.usuarioMail,
          userType: user.usuarioTipo,
          userActive: user.usuarioActivo,
        }
      });

      return res.status(200).json(usersList);

    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ status: false });
    }
  }


  /**
   * Obtiene datos de usuario según id seleccionado
   * @param req
   * @param res
   */
  async getUserById(req: Request, res: Response): Promise<Response> {
    const response: { status: boolean; user: Usuarios | null } = {
      status: true,
      user: null,
    };

    try {
      const userRespository: Repository<Usuarios> = getRepository(Usuarios);

      const { id } = req.params;

      const user = await userRespository.findOne({ where: { usuario_id: id } });

      if (!user) {
        response.status = false;
      } else {
        response.user = user;
      }
    } catch (e) {
      console.error(e);

      res.status(500).json({ status: false });
    }

    return res.status(200).json(response);
  }





  /**
   * @function getUserPermissions
   * @param req
   * @param res
   * @returns
   */
  async getUserPermissions(req: Request, res: Response) {
    try {
      if (req.user) {
        return res.status(200).json(req.user.permissions);
        // retornar todos los permisos del usuario loggeado.



        
      }
    } catch (err: any) {
      return res.status(500).send({ status: false, error: err.message });
    }
    return res.sendStatus(204);
  }


}
