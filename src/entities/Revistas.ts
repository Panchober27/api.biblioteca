import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ejemplar } from "./Ejemplar";
import { RevistaAutor } from "./RevistaAutor";
import { RevistaStock } from "./RevistaStock";

@Entity("revistas", { schema: "biblioteca" })
export class Revistas {
  @PrimaryGeneratedColumn({ type: "int", name: "revista_id" })
  revistaId: number;

  @Column("varchar", { name: "nombre", length: 200 })
  nombre: string;

  @Column("varchar", { name: "editorial", length: 200 })
  editorial: string;

  @Column("varchar", { name: "edicion", length: 200 })
  edicion: string;

  @Column("varchar", { name: "fecha_publicacion", length: 200 })
  fechaPublicacion: string;

  @OneToMany(() => Ejemplar, (ejemplar) => ejemplar.revista)
  ejemplars: Ejemplar[];

  @OneToMany(() => RevistaAutor, (revistaAutor) => revistaAutor.revista)
  revistaAutors: RevistaAutor[];

  @OneToMany(() => RevistaStock, (revistaStock) => revistaStock.revista)
  revistaStocks: RevistaStock[];
}
