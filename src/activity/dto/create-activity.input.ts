import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateActivityInput {
  @Field()
  summary: string;
  @Field({ nullable: true})
  description?: string;
  @Field(() => Int)
  projectId: number;
}
