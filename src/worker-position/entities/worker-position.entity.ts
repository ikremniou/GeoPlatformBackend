import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@ObjectType()
export class WorkerPosition {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Type(() => Number)
  @Field(() => Float)
  baseSalary: number;
}
