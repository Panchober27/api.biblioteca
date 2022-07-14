import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Libros } from "./Libros";
import { Revistas } from "./Revistas";
import { Trabajos } from "./Trabajos";
import { PrestamoEjemplar } from "./PrestamoEjemplar";


/**
 * @class Ejemplar
 * @description Clase que representa la tabla ejemplares de la base de datos
 * @property {number} ejemplarId
 * @property {number} isbn ISBN del ejemplar
 * @property {number} libroId Id del libro al que pertenece el ejemplar
 * @property {number} revistaId Id de la revista al que pertenece el ejemplar
 * @property {number} trabajoId Id del trabajo al que pertenece el ejemplar
 * @property {date} fechaEntrega Fecha en la que se entrega el ejemplar a un alumno mediante un prestamo
 * @property {date} fechaFin Fecha en la que debe retorna el ejemplar a la biblioteca
 * @property {date} fechaDevolucion Fecha en la que el alumno devuelve el ejemplar a la biblioteca
 * @property {enum} estado { "DISPONIBLE", "PRESTADO", "ATRASADO" } 
 * @property {Libros} libro Libro al que pertenece el ejemplar
 * @property {Revistas} revista Revista al que pertenece el ejemplar
 * @property {Trabajos} trabajo Trabajo al que pertenece el ejemplar
 * @property {PrestamoEjemplar[]} prestamoEjemplars Prestamos a los que se a asociado este ejemplar.
 */
@Index("isbn", ["isbn"], { unique: true })
@Index("fk_ejemplar_libro", ["libroId"], {})
@Index("fk_ejemplar_revista", ["revistaId"], {})
@Index("fk_ejemplar_ensayo", ["trabajoId"], {})
@Entity("ejemplar", { schema: "biblioteca" })
export class Ejemplar {
  @PrimaryGeneratedColumn({ type: "int", name: "ejemplar_id" })
  ejemplarId: number;

  @Column("int", { name: "isbn", nullable: true, unique: true })
  isbn: number | null;

  @Column("int", { name: "libro_id", nullable: true })
  libroId: number | null;

  @Column("int", { name: "revista_id", nullable: true })
  revistaId: number | null;

  @Column("int", { name: "trabajo_id", nullable: true })
  trabajoId: number | null;

  @Column("date", { name: "fecha_entrega", nullable: true })
  fechaEntrega: Date | null;

  @Column("date", { name: "fecha_fin", nullable: true })
  fechaFin: Date | null;

  @Column("datetime", { name: "fecha_devolucion", nullable: true })
  fechaDevolucion: Date | null;

  @Column("enum", {
    name: "estado",
    nullable: true,
    enum: ["DISPONIBLE", "PRESTADO", "ATRASADO"],
  })
  estado: "DISPONIBLE" | "PRESTADO" | "ATRASADO" | null;

  @ManyToOne(() => Libros, (libros) => libros.ejemplars, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "libro_id", referencedColumnName: "libroId" }])
  libro: Libros;

  @ManyToOne(() => Revistas, (revistas) => revistas.ejemplars, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "revista_id", referencedColumnName: "revistaId" }])
  revista: Revistas;

  @ManyToOne(() => Trabajos, (trabajos) => trabajos.ejemplars, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "trabajo_id", referencedColumnName: "trabajoId" }])
  trabajo: Trabajos;

  @OneToMany(
    () => PrestamoEjemplar,
    (prestamoEjemplar) => prestamoEjemplar.ejemplar
  )
  prestamoEjemplars: PrestamoEjemplar[];
}
