import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TipoLibro } from "./TipoLibro";
import { PrestamosLibros } from "./PrestamosLibros";

@Index("isbn", ["isbn"], { unique: true })
@Index("fk_libro_tipo_libro", ["tipoLibro"], {})
@Entity("libros", { schema: "demo_lib" })
export class Libros {
  @PrimaryGeneratedColumn({ type: "int", name: "libro_id" })
  libroId: number;

  @Column("varchar", { name: "isbn", unique: true, length: 200 })
  isbn: string;

  @Column("varchar", { name: "isbn_tipo", length: 200 })
  isbnTipo: string;

  @Column("varchar", { name: "nombre", length: 200 })
  nombre: string;

  @Column("varchar", { name: "autor", length: 200 })
  autor: string;

  @Column("varchar", { name: "editorial", length: 200 })
  editorial: string;

  @Column("varchar", { name: "edicion", length: 200 })
  edicion: string;

  @Column("varchar", { name: "fecha_publicacion", length: 200 })
  fechaPublicacion: string;

  @Column("int", { name: "tipo_libro" })
  tipoLibro: number;

  @Column("int", { name: "stock" })
  stock: number;

  @ManyToOne(() => TipoLibro, (tipoLibro) => tipoLibro.libros, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "tipo_libro", referencedColumnName: "tipoLibroId" }])
  tipoLibro2: TipoLibro;

  @OneToMany(() => PrestamosLibros, (prestamosLibros) => prestamosLibros.libro)
  prestamosLibros: PrestamosLibros[];
}
