import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field({ description: 'Example field (placeholder)' })
  summary: string;
}
