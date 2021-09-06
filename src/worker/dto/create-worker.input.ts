import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateWorkerInput {
  @Field()
  firstName: string;
  @Field()
  middleName: string;
  @Field()
  lastName: string;
}
