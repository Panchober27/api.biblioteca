import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ProfilePermission } from './perfiles_permisos';

@Entity('permisos')
export class Permission {
  @PrimaryGeneratedColumn()
  permiso_id: number;

  @Column('varchar', { length: 45, nullable: false })
  permiso_nombre: string;

  @Column('varchar', { length: 45 })
  permiso_tag: string;

  @Column('varchar', { length: 45 })
  permiso_descripcion: string;

  @Column('tinyint')
  permiso_activo: number;

  @OneToMany(
    () => ProfilePermission,
    (profilePermission) => profilePermission.permission
  )
  @JoinColumn({ name: 'permiso_id' })
  profilePermission: ProfilePermission[];
}
