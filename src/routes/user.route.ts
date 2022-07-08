import { Router } from 'express';
import { UserController } from '../controllers';
import { schemaValidator } from '../middlewares';

const router = Router();
const userController = new UserController();

router.post(
  '/users',
  // schemaValidator('CREATE_USER'),
  userController.createUser
);



// puede recibir parametros para la busqueda de usuarios en base a 1 o más permisos.
// pasar los permisos en un arreglo por params.
router.get('/users', userController.getUsers);
// router.post('/usersList', userController.getUsers);

router.get('/users/:id', userController.getUserById);


router.get('/userPermissions', userController.getUserPermissions);

router.put(
  '/users/:id',
  schemaValidator('UPDATE_USER'),
  userController.updateUser
);

export default router;
