import { CreateWorkerPositionInput } from './create-worker-position.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkerPositionInput extends PartialType(CreateWorkerPositionInput) {
  @Field(() => Int)
  id: number;
}
