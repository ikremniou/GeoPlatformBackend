import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { ActivityService } from './activity.service';
import { Activity } from './entities/activity.entity';
import { CreateActivityInput } from './dto/create-activity.input';
import { UpdateActivityInput } from './dto/update-activity.input';
import { ClassSerializerInterceptor, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserPolicyGuard } from 'src/auth/policy/user-policy.guard';
import { UserPolicy } from 'src/auth/policy/user-policy.decorator';
import { AbilityActions } from 'src/auth/policy/user-ability.factory';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/entities/project.entity';

@Resolver(() => Activity)
@UseInterceptors(ClassSerializerInterceptor)
export class ActivityResolver {
  constructor(
    private readonly _projectService: ProjectService,
    private readonly _activityService: ActivityService) {}

  @Mutation(() => Activity)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, Activity))
  public createActivity(@Args('createActivityInput') createActivityInput: CreateActivityInput): Promise<Activity> {
    return this._activityService.create(createActivityInput);
  }

  @Query(() => [Activity], { name: 'activities' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, Activity))
  public findAll(
    @Args('filter', { nullable: true }) filter: string,
    @Args('skip', { nullable: true, type: () => Int }) skip: number,
    @Args('take', { nullable: true, type: () => Int }) take: number,
  ): Promise<Activity[]> {
    if (filter) {
      filter = JSON.parse(filter);
    }

    return this._activityService.findAll(filter, skip, take);
  }

  @Query(() => Activity, { name: 'activity' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, Activity))
  public findOne(@Args('id', { type: () => Int }) id: number): Promise<Activity> {
    return this._activityService.findOne(id);
  }

  @Mutation(() => Activity)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Update, Activity))
  public updateActivity(@Args('updateActivityInput') updateActivityInput: UpdateActivityInput): Promise<Activity> {
    return this._activityService.update(updateActivityInput.id, updateActivityInput);
  }

  @Mutation(() => Activity)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Delete, Activity))
  public removeActivity(@Args('id', { type: () => Int }) id: number): Promise<Activity> {
    return this._activityService.remove(id);
  }

  @ResolveField()
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, Project))
  public project(@Parent() activity: Activity): Promise<Project> {
    return this._projectService.findOne(activity.projectId);
  }
}
