import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Carreras } from "./Carreras";
import { Prestamos } from "./Prestamos";

@Index("rut_alumno", ["rutAlumno"], { unique: true })
@Index("fk_alumno_carrera", ["carreraId"], {})
@Entity("alumnos", { schema: "biblioteca" })
export class Alumnos {
  @PrimaryGeneratedColumn({ type: "int", name: "alumno_id" })
  alumnoId: number;

  @Column("varchar", { name: "rut_alumno", unique: true, length: 15 })
  rutAlumno: string;

  @Column("varchar", { name: "nombre_alumno", length: 200 })
  nombreAlumno: string;

  @Column("varchar", { name: "apellido_alumno", length: 200 })
  apellidoAlumno: string;

  @Column("varchar", { name: "email_alumno", length: 200 })
  emailAlumno: string;

  @Column("int", { name: "carrera_id" })
  carreraId: number;

  @Column("tinyint", { name: "alumno_activo", width: 1, default: () => "'1'" })
  alumnoActivo: boolean;

  @ManyToOne(() => Carreras, (carreras) => carreras.alumnos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "carrera_id", referencedColumnName: "carreraId" }])
  carrera: Carreras;

  @OneToMany(() => Prestamos, (prestamos) => prestamos.alumno)
  prestamos: Prestamos[];
}
