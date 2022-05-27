import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Libros } from "./Libros";
import { Revistas } from "./Revistas";
import { Trabajos } from "./Trabajos";
import { PrestamoEjemplar } from "./PrestamoEjemplar";

@Index("isbn", ["isbn"], { unique: true })
@Index("fk_ejemplar_libro", ["libroId"], {})
@Index("fk_ejemplar_revista", ["revistaId"], {})
@Index("fk_ejemplar_ensayo", ["trabajoId"], {})
@Entity("ejemplar", { schema: "biblioteca" })
export class Ejemplar {
  @PrimaryGeneratedColumn({ type: "int", name: "ejemplar_id" })
  ejemplarId: number;

  @Column("int", { name: "isbn", nullable: true, unique: true })
  isbn: number | null;

  @Column("int", { name: "libro_id", nullable: true })
  libroId: number | null;

  @Column("int", { name: "revista_id", nullable: true })
  revistaId: number | null;

  @Column("int", { name: "trabajo_id", nullable: true })
  trabajoId: number | null;

  @Column("date", { name: "fecha_entrga", nullable: true })
  fechaEntrga: string | null;

  @Column("date", { name: "fecha_fin", nullable: true })
  fechaFin: string | null;

  @Column("date", { name: "fecha_devolucion", nullable: true })
  fechaDevolucion: string | null;

  @Column("enum", {
    name: "estado",
    nullable: true,
    enum: ["DISPONIBLE", "PRESTADO", "ATRASADO"],
  })
  estado: "DISPONIBLE" | "PRESTADO" | "ATRASADO" | null;

  @ManyToOne(() => Libros, (libros) => libros.ejemplars, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "libro_id", referencedColumnName: "libroId" }])
  libro: Libros;

  @ManyToOne(() => Revistas, (revistas) => revistas.ejemplars, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "revista_id", referencedColumnName: "revistaId" }])
  revista: Revistas;

  @ManyToOne(() => Trabajos, (trabajos) => trabajos.ejemplars, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "trabajo_id", referencedColumnName: "trabajoId" }])
  trabajo: Trabajos;

  @OneToMany(
    () => PrestamoEjemplar,
    (prestamoEjemplar) => prestamoEjemplar.ejemplar
  )
  prestamoEjemplars: PrestamoEjemplar[];
}
