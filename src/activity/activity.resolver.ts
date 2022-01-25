import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ActivityService } from './activity.service';
import { Activity } from './entities/activity.entity';
import { CreateActivityInput } from './dto/create-activity.input';
import { UpdateActivityInput } from './dto/update-activity.input';
import { ClassSerializerInterceptor, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserPolicyGuard } from 'src/auth/policy/user-policy.guard';
import { UserPolicy } from 'src/auth/policy/user-policy.decorator';
import { AbilityActions } from 'src/auth/policy/user-ability.factory';

@Resolver(() => Activity)
@UseInterceptors(ClassSerializerInterceptor)
export class ActivityResolver {
  constructor(private readonly activityService: ActivityService) {}

  @Mutation(() => Activity)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, Activity))
  public createActivity(@Args('createActivityInput') createActivityInput: CreateActivityInput): Promise<Activity> {
    return this.activityService.create(createActivityInput);
  }

  @Query(() => [Activity], { name: 'activities' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, Activity))
  public findAll(): Promise<Activity[]> {
    return this.activityService.findAll();
  }

  @Query(() => Activity, { name: 'activity' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, Activity))
  public findOne(@Args('id', { type: () => Int }) id: number): Promise<Activity> {
    return this.activityService.findOne(id);
  }

  @Mutation(() => Activity)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Update, Activity))
  public updateActivity(@Args('updateActivityInput') updateActivityInput: UpdateActivityInput): Promise<Activity> {
    return this.activityService.update(updateActivityInput.id, updateActivityInput);
  }

  @Mutation(() => Activity)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Delete, Activity))
  public removeActivity(@Args('id', { type: () => Int }) id: number): Promise<Activity> {
    return this.activityService.remove(id);
  }
}
