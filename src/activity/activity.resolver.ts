import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ActivityService } from './activity.service';
import { Activity } from './entities/activity.entity';
import { CreateActivityInput } from './dto/create-activity.input';
import { UpdateActivityInput } from './dto/update-activity.input';
import { PublicRoute } from 'src/misc/decorators/public-path.decorator';

@PublicRoute()
@Resolver(() => Activity)
export class ActivityResolver {
  constructor(private readonly activityService: ActivityService) {}

  @Mutation(() => Activity)
  public createActivity(@Args('createActivityInput') createActivityInput: CreateActivityInput): Promise<Activity> {
    return this.activityService.create(createActivityInput);
  }

  @Query(() => [Activity], { name: 'activities' })
  public findAll(): Promise<Activity[]> {
    return this.activityService.findAll();
  }

  @Query(() => Activity, { name: 'activity' })
  public findOne(@Args('id', { type: () => Int }) id: number): Promise<Activity> {
    return this.activityService.findOne(id);
  }

  @Mutation(() => Activity)
  public updateActivity(@Args('updateActivityInput') updateActivityInput: UpdateActivityInput): Promise<Activity> {
    return this.activityService.update(updateActivityInput.id, updateActivityInput);
  }

  @Mutation(() => Activity)
  public removeActivity(@Args('id', { type: () => Int }) id: number): Promise<Activity> {
    return this.activityService.remove(id);
  }
}
