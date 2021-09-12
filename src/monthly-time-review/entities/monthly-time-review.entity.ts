import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MonthlyTimeReview {
  @Field({ description: 'Example field (placeholder)' })
  field: string;
}
