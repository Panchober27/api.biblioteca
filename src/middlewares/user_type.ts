import { Request, Response, NextFunction } from 'express';

/**
 * Verifica el tipo de usuario para asignar permisos en ruta de servidor
 * @param {string} userType
 */
const hasType =
  (userType: string) => (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.usuario_tipo === userType) {
      return next();
    }

    res.sendStatus(403);
  };

export default hasType;
