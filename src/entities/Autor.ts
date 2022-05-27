import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LibroAutores } from "./LibroAutores";
import { RevistaAutor } from "./RevistaAutor";
import { TrabajoAutor } from "./TrabajoAutor";

@Entity("autor", { schema: "biblioteca" })
export class Autor {
  @PrimaryGeneratedColumn({ type: "int", name: "autor_id" })
  autorId: number;

  @Column("varchar", { name: "nombres", length: 100 })
  nombres: string;

  @Column("varchar", { name: "apellidos", length: 100 })
  apellidos: string;

  @Column("varchar", { name: "nacionalidad", length: 100 })
  nacionalidad: string;

  @Column("date", { name: "fecha_nacimiento" })
  fechaNacimiento: string;

  @Column("date", { name: "fecha_fallecimiento", nullable: true })
  fechaFallecimiento: string | null;

  @OneToMany(() => LibroAutores, (libroAutores) => libroAutores.autor)
  libroAutores: LibroAutores[];

  @OneToMany(() => RevistaAutor, (revistaAutor) => revistaAutor.autor)
  revistaAutors: RevistaAutor[];

  @OneToMany(() => TrabajoAutor, (trabajoAutor) => trabajoAutor.autor)
  trabajoAutors: TrabajoAutor[];
}
