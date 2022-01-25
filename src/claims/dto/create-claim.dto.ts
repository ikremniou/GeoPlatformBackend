import { ApiProperty } from "@nestjs/swagger";

export class CreateClaimDto {
    @ApiProperty()
    public action: string;
    @ApiProperty()
    public subject: string;
    @ApiProperty()
    public condition?: string;
}
