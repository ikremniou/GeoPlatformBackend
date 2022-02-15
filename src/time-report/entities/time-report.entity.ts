import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Activity } from 'src/activity/entities/activity.entity';
import { Worker } from 'src/worker/entities/worker.entity';

export const AbsentReason = {
  sick: 'sick',
  vacation: 'vacation',
  expense: 'expense',
  unknown: 'unknown',
  weekend: 'weekend',
};

registerEnumType(AbsentReason, { name: 'AbsentReason' });

export type AbsentReason = typeof AbsentReason[keyof typeof AbsentReason];

@ObjectType()
export class TimeReport {
  @Field(() => Int)
  id: number;
  @Field()
  date: Date;
  @Field(() => Int, { nullable: true })
  norm?: number;
  @Field(() => Int, { nullable: true })
  bonus?: number;
  @Field(() => Int, { nullable: true })
  penalty?: number;
  @Field(() => Int, { nullable: true })
  combine?: number;
  @Field(() => Int, { nullable: true })
  travel?: number;
  @Field(() => AbsentReason, { nullable: true })
  absent?: AbsentReason;
  @Field({ nullable: true })
  comment?: string;
  @Field()
  worker: Worker;
  @Field()
  activity: Activity;
  @Field()
  updatedAt: Date;
  activityId: number;
  workerId: number;
}
