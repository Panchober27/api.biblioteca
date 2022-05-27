import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Carreras } from "./Carreras";

@Entity("facultades", { schema: "biblioteca" })
export class Facultades {
  @PrimaryGeneratedColumn({ type: "int", name: "facultad_id" })
  facultadId: number;

  @Column("varchar", { name: "nombre_facultad", length: 200 })
  nombreFacultad: string;

  @Column("varchar", { name: "descripcion_facultad", length: 500 })
  descripcionFacultad: string;

  @OneToMany(() => Carreras, (carreras) => carreras.facultad)
  carreras: Carreras[];
}
