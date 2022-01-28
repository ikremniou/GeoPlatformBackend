import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { WorkerService } from './worker.service';
import { Worker } from './entities/worker.entity';
import { CreateWorkerInput } from './dto/create-worker.input';
import { UpdateWorkerInput } from './dto/update-worker.input';
import { AppConstants } from 'src/app-constants';
import { ClassSerializerInterceptor, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserPolicy } from 'src/auth/policy/user-policy.decorator';
import { UserPolicyGuard } from 'src/auth/policy/user-policy.guard';
import { AbilityActions } from 'src/auth/policy/user-ability.factory';
import { WorkerCategoryService } from 'src/worker-category/worker-category.service';
import { WorkerPositionService } from 'src/worker-position/worker-position.service';
import { WorkerCategory } from 'src/worker-category/entities/worker-category.entity';
import { WorkerPosition } from 'src/worker-position/entities/worker-position.entity';

@Resolver(() => Worker)
@UseInterceptors(ClassSerializerInterceptor)
export class WorkerResolver {
  constructor(
    private readonly _positionService: WorkerPositionService,
    private readonly _categoryService: WorkerCategoryService,
    private readonly _workerService: WorkerService) {}

  @Mutation(() => Worker)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, Worker))
  public createWorker(@Args('createWorkerInput') createWorkerInput: CreateWorkerInput) {
    return this._workerService.create(createWorkerInput);
  }

  @Query(() => [Worker], { name: 'workers' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, Worker))
  public findAll(
    @Args('filter', { nullable: true }) filter: string,
    @Args('skip', { nullable: true, type: () => Int }) skip: number,
    @Args('take', { nullable: true, type: () => Int }) take: number,
  ): Promise<Worker[]> {
    if (!take) {
      take = AppConstants.defaultTakeLimit;
    }
    return this._workerService.findAll(filter, skip, take);
  }

  @Query(() => Worker, { name: 'worker' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, Worker))
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this._workerService.findOne(id);
  }

  @Mutation(() => Worker)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Update, Worker))
  public updateWorker(@Args('updateWorkerInput') updateWorkerInput: UpdateWorkerInput) {
    return this._workerService.update(updateWorkerInput.id, updateWorkerInput);
  }

  @Mutation(() => Worker)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Delete, Worker))
  public removeWorker(@Args('id', { type: () => Int }) id: number) {
    return this._workerService.remove(id);
  }

  @ResolveField()
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, WorkerCategory))
  public category(@Parent() worker: Worker): Promise<WorkerCategory> {
    return this._categoryService.findOne(worker.workerCategoryId);
  }

  @ResolveField()
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, WorkerPosition))
  public position(@Parent() worker: Worker): Promise<WorkerPosition> {
    return this._positionService.findOne(worker.workerPositionId);
  }
}
