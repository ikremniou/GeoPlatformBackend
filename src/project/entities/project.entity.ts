import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Activity } from 'src/activity/entities/activity.entity';
import { WorkClient } from 'src/client/entities/work-client.entity';
import { Worker } from 'src/worker/entities/worker.entity';

@ObjectType()
export class Project {
  @Field(() => Int)
  id: number;
  @Field()
  summary: string;
  @Field({ nullable: true })
  description: string;
  @Field()
  startDate: Date;
  @Field({ nullable: true })
  endDate: Date;
  @Field(() => [Activity])
  activities: Activity[];
  @Field()
  client: WorkClient;
  @Field()
  executor: WorkClient;
  @Field()
  responsible: Worker;

  executorId: number;
  clientId: number;
  responsibleWorkerId: number;
}
