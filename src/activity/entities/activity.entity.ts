import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Project } from 'src/project/entities/project.entity';

@ObjectType()
export class Activity {
  @Field(() => Int)
  id: number;
  @Field()
  summary: string;
  @Field({ nullable: true })
  description?: string;
  @Field()
  project: Project;

  projectId: number;
}
