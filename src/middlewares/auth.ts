import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository, Repository } from 'typeorm';
import { Usuarios } from '../entities';

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}

/**
 * Verifica estado de autenticación de usuario para el acceso de rutas en servidor.
 * @param {Request}req
 * @param {Response}res
 * @param {NextFunction}next
 */
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization;

  const exceptionsRoutes: string[] = ['/api/signin', '/api/demo'];

  if (exceptionsRoutes.includes(req.path)) {
    return next();
  }

  if (!token) {
    // return res.sendStatus(401);
    return res.status(401).json({ status: false, message: 'no hay token!!!!' });
  }

  jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }

    if (decoded) {
      const usuario = decoded.user;

      const userRepository: Repository<Usuarios> = getRepository(Usuarios);

      userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect('user.usuariosPerfiles', 'up')
        .innerJoinAndSelect('up.perfil', 'p')
        .innerJoinAndSelect('p.perfilesPermisos', 'pp')
        .innerJoinAndSelect(
          'pp.permiso',
          'permiso',
        )
        .where('user.usuario =:usuario', {
          usuario,
        })
        .select([
          'user.usuarioId',
          'user.usuario',
          'user.nombre',
          'user.apellido',
          'user.usuarioMail',
          'user.usuarioTipo',
          'p.*',
          'permiso.*',
        ])
        .getRawMany()
        .then((user) => {
          const userObject: any = {
            divisions: [],
            profiles: [],
            permissions: [],
          };

          for (const data of user) {
            const {
              user_usuario_id,
              user_usuario,
              user_nombre,
              user_apellido,
              user_usuario_mail,
              user_usuario_tipo,
              perfil_id,
              perfil_opciones,
              perfil_nombre,
              permiso_tag,
            } = data;

            userObject.usuario_id = user_usuario_id;
            userObject.usuario = user_usuario;
            userObject.nombre = user_nombre;
            userObject.apellido = user_apellido;
            userObject.usuario_mail = user_usuario_mail;
            userObject.usuario_tipo = user_usuario_tipo;

            !userObject.profiles.some(
              (profile: any) => profile.perfil_id === perfil_id
            )
              ? userObject.profiles.push({
                perfil_id,
                perfil_opciones,
                perfil_nombre,
              })
              : null;

            !userObject.permissions.some(
              (permission) => permission.permiso_tag === permiso_tag
            )
              ? userObject.permissions.push({
                permiso_tag,
              })
              : null;
          }

          req.user = userObject;
          console.log(req.user);

          return next();
        });
    } else {
      return res.sendStatus(401);
    }
  });
};

export default isAuthenticated;
