import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

