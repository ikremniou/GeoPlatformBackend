import { Claim } from 'src/claims/entities/claim.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  public readonly id: number;
  @Column()
  public name: string;
  @ManyToMany(() => Claim, claim => claim.roles)
  @JoinTable()
  public claims: Claim[];

  @OneToMany(() => User, user => user.role)
  public users: User[];
}
