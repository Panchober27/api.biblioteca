import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { Permission } from './permisos';
import { Profile } from './perfiles';

@Entity('perfiles_permisos')
@Index(['permiso_id', 'perfil_id'], { unique: true })
export class ProfilePermission {
  @PrimaryGeneratedColumn()
  perfil_permiso_id: number;

  @Column({ nullable: false })
  permiso_id: number;

  @Column({ nullable: false })
  perfil_id: number;

  @ManyToOne(() => Permission, (permission) => permission.profilePermission)
  @JoinColumn({ name: 'permiso_id' })
  permission: Permission;

  @ManyToOne(() => Profile, (profile) => profile.profilePermission)
  @JoinColumn({ name: 'perfil_id' })
  profile: Profile;
}
