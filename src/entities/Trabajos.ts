import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ejemplar } from "./Ejemplar";
import { TrabajoAutor } from "./TrabajoAutor";
import { TrabajoStock } from "./TrabajoStock";

@Entity("trabajos", { schema: "biblioteca" })
export class Trabajos {
  @PrimaryGeneratedColumn({ type: "int", name: "trabajo_id" })
  trabajoId: number;

  @Column("varchar", { name: "nombre", length: 200 })
  nombre: string;

  @Column("varchar", { name: "editorial", length: 200 })
  editorial: string;

  @Column("varchar", { name: "edicion", length: 200 })
  edicion: string;

  @Column("varchar", { name: "fecha_publicacion", length: 200 })
  fechaPublicacion: string;

  @OneToMany(() => Ejemplar, (ejemplar) => ejemplar.trabajo)
  ejemplars: Ejemplar[];

  @OneToMany(() => TrabajoAutor, (trabajoAutor) => trabajoAutor.trabajo)
  trabajoAutors: TrabajoAutor[];

  @OneToMany(() => TrabajoStock, (trabajoStock) => trabajoStock.trabajo)
  trabajoStocks: TrabajoStock[];
}
