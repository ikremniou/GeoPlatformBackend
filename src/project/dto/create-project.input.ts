import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;
  @Field({ nullable: true })
  summary: string;
  @Field()
  startDate: Date;
  @Field()
  endDate: Date;
  @Field(() => Int)
  clientId: number;
  @Field(() => Int)
  executorId: number;
  @Field(() => Int)
  responsibleWorkerId: number;
}
