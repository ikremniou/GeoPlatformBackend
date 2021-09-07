import { CreateMonthlyTimeReviewInput } from './create-monthly-time-review.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMonthlyTimeReviewInput extends PartialType(CreateMonthlyTimeReviewInput) {
  @Field(() => Int)
  id: number;
}
