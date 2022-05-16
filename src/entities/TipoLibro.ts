import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Libros } from "./Libros";

@Entity("tipo_libro", { schema: "demo_lib" })
export class TipoLibro {
  @PrimaryGeneratedColumn({ type: "int", name: "tipo_libro_id" })
  tipoLibroId: number;

  @Column("varchar", { name: "nombre_tipo", length: 200 })
  nombreTipo: string;

  @Column("varchar", { name: "descripcion_tipo", length: 500 })
  descripcionTipo: string;

  @OneToMany(() => Libros, (libros) => libros.tipoLibro2)
  libros: Libros[];
}
