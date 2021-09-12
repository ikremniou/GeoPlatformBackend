import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field({ description: 'Example field (placeholder)' })
  summary: string;
}
