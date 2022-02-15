import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  summary: string;
  @Field({ nullable: true })
  description?: string;
  @Field()
  startDate: Date;
  @Field({ nullable: true })
  endDate?: Date;
  @Field(() => Int)
  clientId: number;
  @Field(() => Int)
  executorId: number;
  @Field(() => Int)
  responsibleWorkerId: number;
}
