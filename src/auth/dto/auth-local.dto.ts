import { ApiProperty } from "@nestjs/swagger";

export class AuthLocalDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}