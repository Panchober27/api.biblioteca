import { Request, Response, NextFunction } from 'express';
import { Validator, ValidatorResult } from 'jsonschema';
import {
  signinSchema,
  createUserSchema,
  updateUserSchema,
  updateProfileSchema,
  updateUserProfile,
} from '../json-schema';

type SchemaType =
  | 'CREATE_USER'
  | 'SIGNIN'
  | 'UPDATE_USER'
  | 'CREATE_PROFILE'
  | 'UPDATE_PROFILE'
  | 'CREATE_USER_PROFILE'
  | 'UPDATE_USER_PROFILE'
  | 'CREATE_DIVISION'
  | 'UPDATE_DIVISION'
  | 'CREATE_MODEL'
  | 'UPDATE_MODEL'
  | 'CREATE_PROFILE_PERMISSION'
  | 'DELETE_PROFILE_PERMISSION'
  | 'CREATE_CLIENT'
  | 'UPDATE_CLIENT'
  | 'CREATE_PROFILE_DIVISION'
  | 'DELETE_PROFILE_DIVISION'
  | 'CREATE_CLIENT_UBICATION'
  | 'UPDATE_CLIENT_UBICATION'
  | 'CREATE_CLIENT_UBICATION_CONTACT'
  | 'UPDATE_CLIENT_UBICATION_CONTACT'
  | 'CREATE_FAMILY'
  | 'UPDATE_FAMILY'
  | 'CREATE_DEAL'
  | 'UPDATE_DEAL'
  | 'GET_ACTIVE'
  | 'CREATE_ACTIVE'
  | 'UPDATE_ACTIVE'
  | 'CREATE_FAMILY_MODEL'
  | 'DELTE_FAMILY_MODEL'
  | 'CREATE_FAMILY_DEAL'
  | 'DELETE_FAMILY_DEAL'
  | 'CREATE_CALIBRATION'
  | 'UPDATE_CALIBRATION'
  | 'CREATE_TEST'
  | 'CREATE_MASS_SET'
  | 'UPDATE_MASS_SET'
  | 'UPDATE_TEST'
  | 'CREATE_FAMILY_CALIBRATION'
  | 'CREATE_CERTIFICATION_REGISTER'
  | 'CREATE_OR_UPDATE_PERMISSION';


export default (schemaType: SchemaType) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const validator: Validator = new Validator();

      // AÑADIR ESQUEMAS RESTANTES PARA VALIDACIÓN
      const validatorSchemas = {
        SIGNIN: signinSchema,
        CREATE_USER: createUserSchema,
        UPDATE_USER: updateUserSchema,
        UPDATE_PROFILE: updateProfileSchema,
        UPDATE_USER_PROFILE: updateUserProfile,
      };

      if (!validatorSchemas.hasOwnProperty(schemaType)) {
        return res.sendStatus(500);
      }

      const validationStatus: ValidatorResult = validator.validate(
        req.body,
        validatorSchemas[schemaType]
      );

      if (!validationStatus.valid) {
        return res.status(400).json({ errors: validationStatus.errors });
      }

      return next();
    } catch (e) {
      console.error(e);

      return res.sendStatus(500);
    }
  };
