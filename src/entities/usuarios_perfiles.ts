import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from './perfiles';
import { User } from './usuarios';

@Entity('usuarios_perfiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  usuario_perfil_id: number;

  @Column({ nullable: false })
  perfil_id: number;

  @Column({ nullable: false })
  usuario_id: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => Profile, (profile) => profile.userProfile)
  @JoinColumn({ name: 'perfil_id' })
  profile: Profile;

  @ManyToOne(() => User, (user) => user.userProfile)
  @JoinColumn({ name: 'usuario_id' })
  user: User;
}
