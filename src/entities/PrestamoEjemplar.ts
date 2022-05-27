import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ejemplar } from "./Ejemplar";
import { Prestamos } from "./Prestamos";

@Index("fk_prestamo_ejemplar_prestamos1_idx", ["prestamoId"], {})
@Index("fk_prestamo_ejemplar_ejemplar1_idx", ["ejemplarId"], {})
@Entity("prestamo_ejemplar", { schema: "biblioteca" })
export class PrestamoEjemplar {
  @PrimaryGeneratedColumn({ type: "int", name: "prestamo_ejemplar_id" })
  prestamoEjemplarId: number;

  @Column("int", { name: "prestamo_id" })
  prestamoId: number;

  @Column("int", { name: "ejemplar_id" })
  ejemplarId: number;

  @ManyToOne(() => Ejemplar, (ejemplar) => ejemplar.prestamoEjemplars, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "ejemplar_id", referencedColumnName: "ejemplarId" }])
  ejemplar: Ejemplar;

  @ManyToOne(() => Prestamos, (prestamos) => prestamos.prestamoEjemplars, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "prestamo_id", referencedColumnName: "prestamoId" }])
  prestamo: Prestamos;
}
