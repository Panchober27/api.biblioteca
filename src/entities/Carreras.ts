import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Alumnos } from "./Alumnos";
import { Facultades } from "./Facultades";

@Index("fk_carrera_facultad", ["facultadId"], {})
@Entity("carreras", { schema: "biblioteca" })
export class Carreras {
  @PrimaryGeneratedColumn({ type: "int", name: "carrera_id" })
  carreraId: number;

  @Column("varchar", { name: "nombre_carrera", length: 200 })
  nombreCarrera: string;

  @Column("varchar", { name: "descripcion_carrera", length: 500 })
  descripcionCarrera: string;

  @Column("int", { name: "facultad_id" })
  facultadId: number;

  @OneToMany(() => Alumnos, (alumnos) => alumnos.carrera)
  alumnos: Alumnos[];

  @ManyToOne(() => Facultades, (facultades) => facultades.carreras, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "facultad_id", referencedColumnName: "facultadId" }])
  facultad: Facultades;
}
