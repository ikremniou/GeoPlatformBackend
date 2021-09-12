import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Activity {
  @Field({ description: 'Example field (placeholder)' })
  summary: string;
  @Field()
  description: string;
}
