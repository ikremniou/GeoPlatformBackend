import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { WorkerCategory } from 'src/worker-category/entities/worker-category.entity';
import { WorkerPosition } from 'src/worker-position/entities/worker-position.entity';

@ObjectType()
export class Worker {
  @Field(() => Int)
  id!: number;
  @Field()
  firstName!: string;
  @Field()
  lastName!: string;
  @Field()
  middleName!: string;
  @Field()
  birthday!: Date;
  @Field({ nullable: true })
  mobilePhone?: string;
  @Field({ nullable: true })
  homePhone?: string;
  @Field()
  hiredDate!: Date;
  @Field({ nullable: true })
  firedDate?: Date;
  @Field(() => Float)
  workNorm!: number;
  @Field(() => Float, { nullable: true })
  boostFactor?: number;
  @Field()
  updatedAt!: Date;
  @Field()
  position!: WorkerPosition;
  @Field()
  category!: WorkerCategory;
  workerPositionId: number;
  workerCategoryId: number;
}
