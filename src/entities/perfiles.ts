import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ProfilePermission } from './perfiles_permisos';
import { UserProfile } from './usuarios_perfiles';

@Entity('perfiles')
export class Profile {
  @PrimaryGeneratedColumn()
  perfil_id: number;

  @Column('varchar', { length: 45, nullable: false })
  perfil_nombre: string;

  @Column('varchar', { length: 200 })
  perfil_opciones: string;

  @Column('tinyint', { default: 1, nullable: false })
  perfil_activo: number;

  @OneToMany(
    () => ProfilePermission,
    (profilePermission) => profilePermission.profile
  )
  @JoinColumn({ name: 'perfil_id' })
  profilePermission: ProfilePermission[];

  @OneToMany(() => UserProfile, (userProfile) => userProfile.profile)
  @JoinColumn({ name: 'perfil_id' })
  userProfile: UserProfile[];

  
}
