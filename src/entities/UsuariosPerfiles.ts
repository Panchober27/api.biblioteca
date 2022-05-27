import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Perfiles } from "./Perfiles";
import { Usuarios } from "./Usuarios";

@Index("fk_usuarios_perfiles_perfiles1_idx", ["perfilId"], {})
@Index("fk_usuarios_perfiles_usuarios1_idx", ["usuarioId"], {})
@Entity("usuarios_perfiles", { schema: "biblioteca" })
export class UsuariosPerfiles {
  @PrimaryGeneratedColumn({ type: "int", name: "usuario_perfil_id" })
  usuarioPerfilId: number;

  @Column("int", { name: "perfil_id" })
  perfilId: number;

  @Column("int", { name: "usuario_id" })
  usuarioId: number;

  @Column("timestamp", {
    name: "timestamp",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  timestamp: Date | null;

  @ManyToOne(() => Perfiles, (perfiles) => perfiles.usuariosPerfiles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "perfil_id", referencedColumnName: "perfilId" }])
  perfil: Perfiles;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.usuariosPerfiles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "usuarioId" }])
  usuario: Usuarios;
}
