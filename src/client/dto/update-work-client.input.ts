import { CreateWorkClientInput } from './create-work-client.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkClientInput extends PartialType(CreateWorkClientInput) {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  isActive: boolean;
}
