import { Request, Response } from 'express';
import { getRepository, Repository, getManager, getConnection } from 'typeorm';
import { Prestamos, Libros, PrestamoEjemplar, Trabajos, Revistas, Ejemplar, LibroStock, RevistaStock, TrabajoStock } from '../entities';
// declare file system module
const fs = require('fs');

export class UploadersController {


    demoFunction = (req: Request, res: Response) => {

        return res.send('demoFunction');
    }



    uploadFiles = async (req: Request, res: Response) => {
        // let files = fs.readdirSync('./');

        try {
            let files = await fs.readdir('./');
    
            console.log(files);
            return res.send('uploadFiles');


        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    }



}