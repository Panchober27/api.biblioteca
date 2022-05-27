import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PerfilesPermisos } from "./PerfilesPermisos";
import { UsuariosPerfiles } from "./UsuariosPerfiles";

@Entity("perfiles", { schema: "biblioteca" })
export class Perfiles {
  @PrimaryGeneratedColumn({ type: "int", name: "perfil_id" })
  perfilId: number;

  @Column("varchar", { name: "perfil_nombre", length: 45 })
  perfilNombre: string;

  @Column("varchar", { name: "perfil_opciones", nullable: true, length: 200 })
  perfilOpciones: string | null;

  @Column("timestamp", {
    name: "timestamp",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  timestamp: Date | null;

  @OneToMany(
    () => PerfilesPermisos,
    (perfilesPermisos) => perfilesPermisos.perfil
  )
  perfilesPermisos: PerfilesPermisos[];

  @OneToMany(
    () => UsuariosPerfiles,
    (usuariosPerfiles) => usuariosPerfiles.perfil
  )
  usuariosPerfiles: UsuariosPerfiles[];
}
