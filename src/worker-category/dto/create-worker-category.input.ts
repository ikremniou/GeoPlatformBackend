import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateWorkerCategoryInput {
  @Field()
  name: string;
}
