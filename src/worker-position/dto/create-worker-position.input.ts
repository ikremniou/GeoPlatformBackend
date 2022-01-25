import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateWorkerPositionInput {
  @Field()
  name: string;
  @Field(() => Float)
  baseSalary: number;
}
