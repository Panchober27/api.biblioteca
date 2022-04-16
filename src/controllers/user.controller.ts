import crypto from 'crypto';
import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import { User, Permission, UserProfile } from '../entities';

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
      const { userName, name, lastName, password, email } = req.body;
      const user = await runner.manager.findOne(
        User,
        {
          where: { usuario: userName },
        }
      );

      if (user) {
        return res.status(400).json({ status: false, error: USER_ALREADY_EXISTS });
      }

      const userSalt = crypto.randomBytes(16).toString('base64');
      const encryptedPassword = crypto.pbkdf2Sync(password, userSalt, 10000, 64, 'sha1').toString('base64');

      await runner.startTransaction();
      const { usuario_id } = await runner.manager.save(
        runner.manager.create(
          User,
          {
            usuario: userName,
            nombre: name,
            apellido: lastName,
            password: encryptedPassword,
            usuario_mail: email,
            usuario_salt: userSalt,
          })
      );

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
      const { userName, name, lastName, password, email, userType, userActive, profileId } = req.body;

      const user = await runner.manager.findOne(
        User,
        {
          where: { usuario_id: id },
        }
      );

      if (!user) {
        return res.status(400).json({ status: false, error: USER_NOT_EXIST });
      }

      await runner.startTransaction();

      await runner.manager.update(
        User,
        {
          usuario_id: id,
        },
        {
          usuario: userName,
          nombre: name,
          apellido: lastName,
          usuario_mail: email,
          usuario_tipo: userType,
          password: password ? crypto.pbkdf2Sync(password, user.usuario_salt, 10000, 64, 'sha1').toString('base64') : user.password,
          usuario_salt: user.usuario_salt,
        } as User
      );

      await runner.manager.delete(UserProfile,{ usuario_id: id, perfil_id: profileId });

      await runner.manager.save(
        runner.manager.create(
          UserProfile, {
          usuario_id: Number(id),
          perfil_id: profileId,
        })
      );


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
      const { neededPerm } = req.params; // variable para filtrar usuarios por permiso.
      const userRepo = getRepository(User);

      // Cambiar a consulta que filtre por perfiles que tengan la division del usuario loggeado.
      const users = await userRepo.find();

      // AÑADIR ID DE PERFIL DEL USUARIO
      const userProfileRepo = getRepository(UserProfile);
      const userProfiles = await userProfileRepo.find();

      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < userProfiles.length; j++) {
          if (users[i].usuario_id === userProfiles[j].usuario_id) {
            users[i].perfil_id = userProfiles[j].perfil_id;
          }
        }
      }

      let usersList = [] as any;

      usersList = users.map((user) => {
        return {
          usuario_id: user.usuario_id,
          usuario: user.usuario,
          nombre: user.nombre,
          apellido: user.apellido,
          fullName: user.nombre + ' ' + user.apellido,
          usuario_mail: user.usuario_mail,
          perfil_id: user.perfil_id,
          userType: user.usuario_tipo,
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
    const response: { status: boolean; user: User | null } = {
      status: true,
      user: null,
    };

    try {
      const userRespository: Repository<User> = getRepository(User);

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
        console.log(req.user);
        return res.status(200).json(req.user.permissions);
      }
    } catch (err: any) {
      return res.status(500).send({ status: false, error: err.message });
    }
    return res.sendStatus(204);
  }


}
