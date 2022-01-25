import { CreateWorkerInput } from './create-worker.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkerInput extends PartialType(CreateWorkerInput) {
  @Field(() => Int)
  id: number;
}
