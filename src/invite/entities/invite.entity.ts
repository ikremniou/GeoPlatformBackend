import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invite {
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string;
    // @OneToOne(() => Worker)
    // @JoinColumn()
    // public worker: Worker;
}
