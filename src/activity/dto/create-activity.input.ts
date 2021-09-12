import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateActivityInput {
  @Field({ description: 'Example field (placeholder)' })
  summary: string;
  @Field()
  description: string;
}
