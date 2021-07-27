import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    users: number[];
    @ApiProperty()
    claims: number[];
}
