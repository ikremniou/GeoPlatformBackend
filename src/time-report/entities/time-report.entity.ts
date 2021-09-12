import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TimeReport {
  @Field({ description: 'Example field (placeholder)' })
  id: Date;
  @Field({ nullable: true })
  comment: string;
}
