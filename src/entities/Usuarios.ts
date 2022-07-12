import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Prestamos } from "./Prestamos";
import { UsuariosPerfiles } from "./UsuariosPerfiles";


/**
 * @class Usuarios
 * @description Clase que representa la tabla usuarios de la base de datos
 * @property {number} usuarioId Id de la tabla
 * @property {string} usuario Nombre de usuario
 * @property {string} nombre Nombre del usuario
 * @property {string} apellido Apellido del usuario
 * @property {string} password Contraseña del usuario
 * @property {string} usuarioToken Token de acceso del usuario, se resetea cada 24 horas
 * @property {string} usuarioSalt Salt de la contraseña del usuario
 * @property {string} usuarioMail Correo electronico del usuario
 * @property {enum} usuarioTipo Tipo de usuario, puede ser "ADMINISTRADOR", "USUARIO"
 * @property {boolean} usuarioActivo Indica si el usuario esta activo o no
 * @property {date} timestamp Fecha de creacion del usuario
 * @property {Prestamos[]} prestamos Prestamos que estan asociados al usuario
 * @property {UsuariosPerfiles[]} usuariosPerfiles Perfiles que tiene asociado el usuario
 */
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
