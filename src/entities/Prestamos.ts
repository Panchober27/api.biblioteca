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
import { PrestamosLibros } from "./PrestamosLibros";

@Index("fk_prestamo_alumno", ["alumnoId"], {})
@Index("fk_prestamo_usuario", ["usuarioId"], {})
@Entity("prestamos", { schema: "demo_lib" })
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

  @Column("varchar", { name: "fecha_entrega", length: 200 })
  fechaEntrega: string;

  @Column("enum", {
    name: "estado",
    nullable: true,
    enum: ["EN_STOCK", "EN_PRESTAMO_VIGENTE", "EN_PRESTAMO_RETRASO"],
  })
  estado: "EN_STOCK" | "EN_PRESTAMO_VIGENTE" | "EN_PRESTAMO_RETRASO" | null;

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
    () => PrestamosLibros,
    (prestamosLibros) => prestamosLibros.prestamo
  )
  prestamosLibros: PrestamosLibros[];
}
