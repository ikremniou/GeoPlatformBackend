import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { WorkerCategory } from 'src/worker-category/entities/worker-category.entity';
import { WorkerPosition } from 'src/worker-position/entities/worker-position.entity';

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
  @Field()
  birthday: Date;
  @Field()
  mobilePhone?: string;
  @Field()
  homePhone?: string;
  @Field()
  hiredDate: Date;
  @Field()
  firedDate?: Date;
  @Field(() => Float)
  workNorm: number;
  @Field(() => Float)
  boostFactor: number;
  @Field()
  updatedAt: Date;
  @Field()
  position: WorkerPosition;
  @Field()
  category: WorkerCategory;
}
