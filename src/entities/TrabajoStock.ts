import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Trabajos } from "./Trabajos";

@Index("fk_trabajo_stock_trabajos1_idx", ["trabajoId"], {})
@Entity("trabajo_stock", { schema: "biblioteca" })
export class TrabajoStock {
  @PrimaryGeneratedColumn({ type: "int", name: "trabajo_stock_id" })
  trabajoStockId: number;

  @Column("int", { name: "trabajo_id" })
  trabajoId: number;

  @Column("int", { name: "total" })
  total: number;

  @Column("int", { name: "en_biblioteca" })
  enBiblioteca: number;

  @Column("int", { name: "en_prestamo" })
  enPrestamo: number;

  @Column("int", { name: "en_atraso" })
  enAtraso: number;

  @ManyToOne(() => Trabajos, (trabajos) => trabajos.trabajoStocks, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "trabajo_id", referencedColumnName: "trabajoId" }])
  trabajo: Trabajos;
}
