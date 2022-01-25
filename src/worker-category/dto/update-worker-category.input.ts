import { CreateWorkerCategoryInput } from './create-worker-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkerCategoryInput extends PartialType(CreateWorkerCategoryInput) {
  @Field(() => Int)
  id: number;
}
