import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Usuarios } from '../entities';


/**
 * WebService para autenticar usuarios
 * @module AuthController
 */


export class AuthController {
  

  /**
   * @function signin
   * @description Función que permite iniciar sesión.
   * @param {string} userName Nombre de usuario
   * @param {string}  password Contraseña
   * @returns {string} token JWT
   */
  async signin(req: Request, res: Response): Promise<Response | undefined> {
    const userRespository = getRepository(Usuarios);

    try {
      const { userName, password } = req.body;

      const user = await userRespository.findOne({
        where: { usuario: userName, usuarioActivo: true },
      });

      if (!user) {
        return res.status(403).json({ status: false });
      }

      crypto.pbkdf2(
        password,
        user.usuarioSalt ? user.usuarioSalt : '',
        10000,
        64,
        'sha1',
        (err, key) => {
          const encryptedPassword = key.toString('base64');

          if (user.password === encryptedPassword) {
            const token = jwt.sign(
              { user: user.usuario },
              process.env.JWT_SECRET || '',
              {
                expiresIn: process.env.JWT_EXPIRES_IN || '1d',
              }
            );


            return res.status(200).json({ status: true, token });
          }

          return res.status(403).json({ status: false });
        }
      );
    } catch (e: any) {
      console.error(e);

      return res.status(500).json({ status: false, error: e.message });
    }
  }
}
