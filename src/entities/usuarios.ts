import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';


import { UserProfile } from './usuarios_perfiles';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  usuario_id: number;

  @Column('varchar', { length: 200 })
  usuario: string;

  @Column('varchar', { length: 200, nullable: false })
  nombre: string;

  @Column('varchar', { length: 200 })
  apellido: string;

  @Column('varchar', { length: 200, nullable: false })
  password: string;

  @Column('varchar', { length: 1000 })
  usuario_token: string;

  @Column('varchar', { length: 100 })
  usuario_salt: string;

  @Column('varchar', { length: 150, nullable: false })
  usuario_mail: string;

  @Column('varchar', { length: 200 })
  usuario_opciones: string;

  @Column('enum', { enum: ['USUARIO', 'TECNICO'] })
  usuario_tipo: 'USUARIO' | 'TECNICO';

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @OneToMany(() => UserProfile, (userProfile) => userProfile.user)
  @JoinColumn({ name: 'usuario_id' })
  userProfile: UserProfile[];


  // Agrego valor.
  perfil_id: number;
}
