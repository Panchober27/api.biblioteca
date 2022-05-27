import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Libros } from "./Libros";

@Index("fk_libro_stock_libros1_idx", ["libroId"], {})
@Entity("libro_stock", { schema: "biblioteca" })
export class LibroStock {
  @PrimaryGeneratedColumn({ type: "int", name: "libro_stock_id" })
  libroStockId: number;

  @Column("int", { name: "libro_id" })
  libroId: number;

  @Column("int", { name: "stock" })
  stock: number;

  @ManyToOne(() => Libros, (libros) => libros.libroStocks, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "libro_id", referencedColumnName: "libroId" }])
  libro: Libros;
}
