import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PerfilesPermisos } from "./PerfilesPermisos";

@Index("permisos_tag_UN", ["permisoTag"], { unique: true })
@Entity("permisos", { schema: "demo_lib" })
export class Permisos {
  @PrimaryGeneratedColumn({ type: "int", name: "permiso_id" })
  permisoId: number;

  @Column("varchar", { name: "permiso_nombre", length: 50 })
  permisoNombre: string;

  @Column("varchar", { name: "permiso_tag", unique: true, length: 50 })
  permisoTag: string;

  @Column("varchar", {
    name: "permiso_descripcion",
    nullable: true,
    length: 100,
  })
  permisoDescripcion: string | null;

  @Column("timestamp", {
    name: "timestamp",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  timestamp: Date | null;

  @OneToMany(
    () => PerfilesPermisos,
    (perfilesPermisos) => perfilesPermisos.permiso
  )
  perfilesPermisos: PerfilesPermisos[];
}
