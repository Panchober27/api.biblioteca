import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Prestamos } from "./Prestamos";
import { UsuariosPerfiles } from "./UsuariosPerfiles";

@Entity("usuarios", { schema: "biblioteca" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "int", name: "usuario_id" })
  usuarioId: number;

  @Column("varchar", { name: "usuario", length: 200 })
  usuario: string;

  @Column("varchar", { name: "nombre", nullable: true, length: 200 })
  nombre: string | null;

  @Column("varchar", { name: "apellido", nullable: true, length: 200 })
  apellido: string | null;

  @Column("varchar", { name: "password", length: 200 })
  password: string;

  @Column("varchar", { name: "usuario_token", nullable: true, length: 1000 })
  usuarioToken: string | null;

  @Column("varchar", { name: "usuario_salt", nullable: true, length: 100 })
  usuarioSalt: string | null;

  @Column("varchar", { name: "usuario_mail", length: 150 })
  usuarioMail: string;


  @Column("enum", {
    name: "usuario_tipo",
    nullable: true,
    enum: ["USUARIO", "ADMINISTRADOR"],
  })
  usuarioTipo: "USUARIO" | "ADMINISTRADOR" | null;

  @Column("tinyint", {
    name: "usuario_activo",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  usuarioActivo: boolean | null;

  @Column("timestamp", {
    name: "timestamp",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  timestamp: Date | null;

  @OneToMany(() => Prestamos, (prestamos) => prestamos.usuario)
  prestamos: Prestamos[];

  @OneToMany(
    () => UsuariosPerfiles,
    (usuariosPerfiles) => usuariosPerfiles.usuario
  )
  usuariosPerfiles: UsuariosPerfiles[];
}
