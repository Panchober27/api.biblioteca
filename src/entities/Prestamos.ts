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

  @Column("varchar", { name: "fecha_inicio", length: 200 })
  fechaInicio: string;

  @Column("varchar", { name: "fecha_fin", length: 200 })
  fechaFin: string;

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
