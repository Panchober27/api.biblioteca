import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Libros } from "./Libros";
import { Prestamos } from "./Prestamos";

@Index("fk_prestamo_libro", ["prestamoId"], {})
@Index("fk_libro_prestamo", ["libroId"], {})
@Entity("prestamos_libros", { schema: "demo_lib" })
export class PrestamosLibros {
  @PrimaryGeneratedColumn({ type: "int", name: "prestamos_libros_id" })
  prestamosLibrosId: number;

  @Column("int", { name: "prestamo_id" })
  prestamoId: number;

  @Column("int", { name: "libro_id" })
  libroId: number;

  @ManyToOne(() => Libros, (libros) => libros.prestamosLibros, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "libro_id", referencedColumnName: "libroId" }])
  libro: Libros;

  @ManyToOne(() => Prestamos, (prestamos) => prestamos.prestamosLibros, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "prestamo_id", referencedColumnName: "prestamoId" }])
  prestamo: Prestamos;
}
