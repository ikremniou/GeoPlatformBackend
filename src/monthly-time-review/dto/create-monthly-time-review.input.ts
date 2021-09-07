import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMonthlyTimeReviewInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
