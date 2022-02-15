import { Field, InputType, Int } from '@nestjs/graphql';
import { AbsentReason } from '../entities/time-report.entity';

@InputType()
export class CreateTimeReportInput {
  @Field()
  date: Date;
  @Field(() => Int, { nullable: true })
  norm?: number;
  @Field(() => Int, { nullable: true })
  bonus?: number;
  @Field(() => Int, { nullable: true })
  penalty?: number;
  @Field(() => Int, { nullable: true })
  combine?: number;
  @Field(() => Int, { nullable: true })
  travel?: number;
  @Field(() => AbsentReason, { nullable: true })
  absent?: AbsentReason;
  @Field({ nullable: true })
  comment?: string;
  @Field(() => Int)
  activityId: number;
  @Field(() => Int)
  workerId: number;
}
