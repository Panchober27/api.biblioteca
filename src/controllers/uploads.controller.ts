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
        const students = {}
        const prestamos = {}
        const libro = {}

        try {
            const csvText = fs.readFileSync(`${__dirname}/../public/demo.csv`, {encoding: 'utf-8'}).toString();
            const lines = csvText.split('\n').map(line => line.split(','));
            console.log({csvText, lines})
            for(let i = 0; i<lines.length; i++) {
                const [idLibro, libroNombre, idUser, idPrestamo, ] = lines[i]
                // Existe el libro
                if(libro[idLibro]) console.log('crear si no existe')
                // Existe user
                if(students[idUser]) console.log()
                // Existe 
            }
            return res.send('Success')
            
            
            


        } catch (err: any) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    }



}