import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ejemplar } from "./Ejemplar";
import { LibroAutores } from "./LibroAutores";
import { LibroStock } from "./LibroStock";

/**
 * @class Libros
 * @description Clase que representa la tabla libros de la base de datos
 * @property {number} libroId
 * @property {string} titulo
 * @property {string} isbn
 * @property {string} editorial
 * @property {string} edicion
 * @property {string} fechaPublicacion
 * @property {boolean} libroActivo
 * @property {Ejemplar[]} ejemplares
 * @property {LibroAutores[]} libroAutores
 * @property {LibroStock[]} libroStock
 */
@Entity("libros", { schema: "biblioteca" })
export class Libros {
  @PrimaryGeneratedColumn({ type: "int", name: "libro_id" })
  libroId: number;

  @Column("varchar", { name: "isbn_tipo", length: 200 })
  isbnTipo: string;

  @Column("varchar", { name: "nombre", length: 200 })
  nombre: string;

  @Column("varchar", { name: "editorial", length: 200 })
  editorial: string;

  @Column("varchar", { name: "edicion", length: 200 })
  edicion: string;

  @Column("date", { name: "fecha_publicacion" })
  fechaPublicacion: string;

  @OneToMany(() => Ejemplar, (ejemplar) => ejemplar.libro)
  ejemplars: Ejemplar[];

  @OneToMany(() => LibroAutores, (libroAutores) => libroAutores.libro)
  libroAutores: LibroAutores[];

  @OneToMany(() => LibroStock, (libroStock) => libroStock.libro)
  libroStocks: LibroStock[];
}
