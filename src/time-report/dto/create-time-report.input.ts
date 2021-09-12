import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTimeReportInput {
  @Field({ nullable: true })
  comment?: string;
}
