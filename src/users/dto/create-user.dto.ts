import { ApiProperty } from "@nestjs/swagger";
import { IsAscii, IsEmail, IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(5, 200)
  @IsAscii()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsAscii()
  @Length(8, 25)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  registerToken: string;
}
