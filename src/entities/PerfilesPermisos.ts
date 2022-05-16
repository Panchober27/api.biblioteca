import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Perfiles } from "./Perfiles";
import { Permisos } from './Permisos';

@Index("perfiles_permisos_UN", ["permisoId", "perfilId"], { unique: true })
@Index("fk_perfiles_permisos_permisos1_idx", ["permisoId"], {})
@Index("fk_perfiles_permisos_perfiles1_idx", ["perfilId"], {})
@Entity("perfiles_permisos", { schema: "demo_lib" })
export class PerfilesPermisos {
  @PrimaryGeneratedColumn({ type: "int", name: "perfil_permiso_id" })
  perfilPermisoId: number;

  @Column("int", { name: "permiso_id" })
  permisoId: number;

  @Column("int", { name: "perfil_id" })
  perfilId: number;

  @Column("timestamp", {
    name: "timestamp",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  timestamp: Date | null;

  @ManyToOne(() => Perfiles, (perfiles) => perfiles.perfilesPermisos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "perfil_id", referencedColumnName: "perfilId" }])
  perfil: Perfiles;

  @ManyToOne(() => Permisos, (permisos) => permisos.perfilesPermisos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "permiso_id", referencedColumnName: "permisoId" }])
  permiso: Permisos;
}
