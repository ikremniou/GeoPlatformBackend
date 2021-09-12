import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMonthlyTimeReviewInput {
  @Field({ description: 'Example field (placeholder)' })
  field: string;
}
