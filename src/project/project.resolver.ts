import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ClassSerializerInterceptor, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserPolicyGuard } from 'src/auth/policy/user-policy.guard';
import { UserPolicy } from 'src/auth/policy/user-policy.decorator';
import { AbilityActions } from 'src/auth/policy/user-ability.factory';
import { Worker } from 'src/worker/entities/worker.entity';
import { WorkClient } from 'src/client/entities/work-client.entity';
import { WorkClientService } from 'src/client/work-client.service';
import { WorkerService } from 'src/worker/worker.service';

@Resolver(() => Project)
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectResolver {
  constructor(
    private readonly _workerService: WorkerService,
    private readonly _clientService: WorkClientService,
    private readonly _projectService: ProjectService,
  ) {}

  @Mutation(() => Project)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, Project))
  public createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput): Promise<Project> {
    return this._projectService.create(createProjectInput);
  }

  @Query(() => [Project], { name: 'projects' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, Project))
  public findAll(
    @Args('filter', { nullable: true }) filter: string,
    @Args('skip', { nullable: true, type: () => Int }) skip: number,
    @Args('take', { nullable: true, type: () => Int }) take: number,
  ): Promise<Project[]> {
    if (filter) {
      filter = JSON.parse(filter);
    }

    return this._projectService.findAll(filter, skip, take);
  }

  @Query(() => Project, { name: 'project' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, Project))
  public findOne(@Args('id', { type: () => Int }) id: number): Promise<Project> {
    return this._projectService.findOne(id);
  }

  @Mutation(() => Project)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Update, Project))
  public updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput): Promise<Project> {
    return this._projectService.update(updateProjectInput.id, updateProjectInput);
  }

  @Mutation(() => Project)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Delete, Project))
  public removeProject(@Args('id', { type: () => Int }) id: number): Promise<Project> {
    return this._projectService.remove(id);
  }

  @ResolveField()
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, Worker))
  public responsible(@Parent() project: Project): Promise<Worker> {
    return this._workerService.findOne(project.responsibleWorkerId);
  }

  @ResolveField()
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, WorkClient))
  public client(@Parent() project: Project): Promise<WorkClient> {
    return this._clientService.findOne(project.clientId);
  }

  @ResolveField()
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, WorkClient))
  public executor(@Parent() project: Project): Promise<WorkClient> {
    return this._clientService.findOne(project.executorId);
  }
}
