import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateWorkerInput {
  @Field()
  firstName!: string;
  @Field()
  middleName!: string;
  @Field()
  lastName!: string;
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
  @Field(() => Int)
  workerPositionId: number;
  @Field(() => Int)
  workerCategoryId: number;
}
