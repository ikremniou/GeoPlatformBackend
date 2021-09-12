import { CreateTimeReportInput } from './create-time-report.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTimeReportInput extends PartialType(CreateTimeReportInput) {
  @Field()
  id: string;
}
