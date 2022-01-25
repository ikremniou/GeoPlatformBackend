import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateWorkerInput {
  @Field()
  firstName: string;
  @Field()
  middleName: string;
  @Field()
  lastName: string;
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
  @Field(() => Int)
  workerPositionId: number;
  @Field(() => Int)
  workerCategoryId: number;
}
