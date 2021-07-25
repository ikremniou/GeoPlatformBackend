import { Exclude } from 'class-transformer';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly username: string;

  @Column()
  public email: string;

  @Column({ default: 'active' })
  public status: 'blocked' | 'active';

  @Column()
  @Exclude()
  public password: string;

  @ManyToOne(() => Role, role => role.users)
  public role: Role;
}

