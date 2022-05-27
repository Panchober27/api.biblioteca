import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Autor } from "./Autor";
import { Revistas } from "./Revistas";

@Index("fk_revista_autor_autores1_idx", ["autorId"], {})
@Index("fk_revista_autor_revistas1_idx", ["revistaId"], {})
@Entity("revista_autor", { schema: "biblioteca" })
export class RevistaAutor {
  @PrimaryGeneratedColumn({ type: "int", name: "revista_autor_id" })
  revistaAutorId: number;

  @Column("int", { name: "revista_id" })
  revistaId: number;

  @Column("int", { name: "autor_id" })
  autorId: number;

  @ManyToOne(() => Autor, (autor) => autor.revistaAutors, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "autor_id", referencedColumnName: "autorId" }])
  autor: Autor;

  @ManyToOne(() => Revistas, (revistas) => revistas.revistaAutors, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "revista_id", referencedColumnName: "revistaId" }])
  revista: Revistas;
}
