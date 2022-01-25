import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class WorkerCategory {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
}
