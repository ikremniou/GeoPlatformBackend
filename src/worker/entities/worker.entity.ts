import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Worker {
  @Field(() => Int)
  id: number;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  middleName: string;
}
