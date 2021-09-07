import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Activity {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
