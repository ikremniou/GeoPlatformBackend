import { ApiProperty } from "@nestjs/swagger";
import { Validate } from "class-validator";
import { IsAsciiValidator } from "src/misc/validation/is-ascii.validator";
import { IsEmailValidator } from "src/misc/validation/is-email.validator";
import { IsUUIDValidator } from "src/misc/validation/is-uuid.validator";
import { LengthValidator } from "src/misc/validation/length.validator";
import { IsEmptyValidator } from "src/misc/validation/is-empty.validator";

export class CreateUserDto {
  @ApiProperty()
  @Validate(IsEmptyValidator)
  @Validate(LengthValidator, [5, 50])
  @Validate(IsAsciiValidator)
  username: string;

  @ApiProperty()
  @Validate(IsEmptyValidator)
  @Validate(IsEmailValidator)
  email: string;

  @ApiProperty()
  @Validate(IsAsciiValidator)
  @Validate(IsEmptyValidator)
  @Validate(LengthValidator, [8, 25])
  password: string;

  @ApiProperty()
  @Validate(IsUUIDValidator, [4])
  @Validate(IsEmptyValidator)
  registerToken: string;
}
