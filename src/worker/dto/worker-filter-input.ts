import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ContainsInput {
  @Field()
  contains: string;
}

@InputType()
export class WorkerFilterInput {
  @Field({ nullable: true })
  lastName: ContainsInput;
  @Field({ nullable: true })
  firstName: ContainsInput;
  @Field({ nullable: true })
  middleName: ContainsInput;
}
