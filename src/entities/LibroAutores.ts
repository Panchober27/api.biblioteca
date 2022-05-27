import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Autor } from "./Autor";
import { Libros } from "./Libros";

@Index("fk_libro_autores_autores1_idx", ["autorId"], {})
@Index("fk_libro_autores_libros1_idx", ["libroId"], {})
@Entity("libro_autores", { schema: "biblioteca" })
export class LibroAutores {
  @PrimaryGeneratedColumn({ type: "int", name: "libro_autor_id" })
  libroAutorId: number;

  @Column("int", { name: "libro_id" })
  libroId: number;

  @Column("int", { name: "autor_id" })
  autorId: number;

  @ManyToOne(() => Autor, (autor) => autor.libroAutores, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "autor_id", referencedColumnName: "autorId" }])
  autor: Autor;

  @ManyToOne(() => Libros, (libros) => libros.libroAutores, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "libro_id", referencedColumnName: "libroId" }])
  libro: Libros;
}
