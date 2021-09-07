import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MonthlyTimeReview {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
