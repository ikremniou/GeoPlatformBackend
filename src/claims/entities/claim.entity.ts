import { Role } from "../../roles/entities/role.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Claim {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public action: string;
    @Column()
    public subject: string;
    @Column()
    public condition: string;
    @ManyToMany(() => Role, role => role.claims)
    public roles: string;
}
