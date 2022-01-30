import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class WorkClient {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field()
  address: string;
  @Field()
  contactPhone: string;
  @Field()
  isActive: boolean;
}
