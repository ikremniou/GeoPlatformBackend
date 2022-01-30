import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateWorkClientInput {
  @Field()
  name: string;
  @Field()
  address: string;
  @Field()
  contactPhone: string;
}