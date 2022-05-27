import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Autor } from "./Autor";
import { Trabajos } from "./Trabajos";

@Index("fk_trabajo_autor_autores1_idx", ["autorId"], {})
@Index("fk_trabajo_autor_trabajos1_idx", ["trabajoId"], {})
@Entity("trabajo_autor", { schema: "biblioteca" })
export class TrabajoAutor {
  @PrimaryGeneratedColumn({ type: "int", name: "trabajo_autor_id" })
  trabajoAutorId: number;

  @Column("int", { name: "trabajo_id" })
  trabajoId: number;

  @Column("int", { name: "autor_id" })
  autorId: number;

  @ManyToOne(() => Autor, (autor) => autor.trabajoAutors, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "autor_id", referencedColumnName: "autorId" }])
  autor: Autor;

  @ManyToOne(() => Trabajos, (trabajos) => trabajos.trabajoAutors, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "trabajo_id", referencedColumnName: "trabajoId" }])
  trabajo: Trabajos;
}
