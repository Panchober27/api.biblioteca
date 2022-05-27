import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Revistas } from "./Revistas";

@Index("fk_revista_stock_revistas1_idx", ["revistaId"], {})
@Entity("revista_stock", { schema: "biblioteca" })
export class RevistaStock {
  @PrimaryGeneratedColumn({ type: "int", name: "revista_stock_id" })
  revistaStockId: number;

  @Column("int", { name: "revista_id" })
  revistaId: number;

  @Column("int", { name: "total" })
  total: number;

  @Column("int", { name: "en_biblioteca" })
  enBiblioteca: number;

  @Column("int", { name: "en_prestamo" })
  enPrestamo: number;

  @Column("int", { name: "en_atraso" })
  enAtraso: number;

  @ManyToOne(() => Revistas, (revistas) => revistas.revistaStocks, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "revista_id", referencedColumnName: "revistaId" }])
  revista: Revistas;
}
