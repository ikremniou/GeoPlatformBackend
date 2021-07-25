import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { OneToMany } from "typeorm";

export class CreateRoleDto {
    @ApiProperty()
    name: string;
    @OneToMany(() => User, user => user.role)
    users: User[];
}
