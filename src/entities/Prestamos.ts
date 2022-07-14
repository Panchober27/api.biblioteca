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
import { Usuarios } from "./Usuarios";
import { PrestamoEjemplar } from "./PrestamoEjemplar";


/**
 * @class Prestamos
 * @description Clase que representa la tabla prestamos de la base de datos
 * @property {number} prestamoId Id del prestamo
 * @property {number} alumnoId Id del alumno al que esta asociado el prestamo
 * @property {number} usuarioId Id del usuario que realiza el prestamo
 * @property {string} fechaInicio Fecha de inicio del prestamo
 * @property {string} fechaFin Fecha de fin del prestamo ...
 * @property {enum} estado {"PRESTADO", "ATRASADO", "FINALIZADO", "FINALIZADO_ATRASADO"} 
 * @property {Alumnos} alumno Alumno al que esta asociado el prestamo
 * @property {Usuarios} usuario Usuario que realiza el prestamo
 * @property {PrestamoEjemplar[]} prestamoEjemplars Ejemplares que estan asociados al prestamo.
 */
@Index("fk_prestamo_alumno", ["alumnoId"], {})
@Index("fk_prestamo_usuario", ["usuarioId"], {})
@Entity("prestamos", { schema: "biblioteca" })
export class Prestamos {
  @PrimaryGeneratedColumn({ type: "int", name: "prestamo_id" })
  prestamoId: number;

  @Column("int", { name: "alumno_id" })
  alumnoId: number;

  @Column("int", { name: "usuario_id" })
  usuarioId: number;

  @Column("date", { name: "fecha_inicio" })
  fechaInicio: Date;

  @Column("date", { name: "fecha_fin" })
  fechaFin: Date;

  @Column("enum", {
    name: "estado",
    nullable: true,
    enum: ["PRESTADO", "ATRASADO", "FINALIZADO", "FINALIZADO_ATRASADO"],
  })
  estado: "PRESTADO" | "ATRASADO" | "FINALIZADO" | "FINALIZADO_ATRASADO" | null;

  @ManyToOne(() => Alumnos, (alumnos) => alumnos.prestamos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "alumno_id", referencedColumnName: "alumnoId" }])
  alumno: Alumnos;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.prestamos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "usuarioId" }])
  usuario: Usuarios;

  @OneToMany(
    () => PrestamoEjemplar,
    (prestamoEjemplar) => prestamoEjemplar.prestamo
  )
  prestamoEjemplars: PrestamoEjemplar[];
}
