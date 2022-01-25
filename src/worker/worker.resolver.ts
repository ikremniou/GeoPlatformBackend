import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkerService } from './worker.service';
import { Worker } from './entities/worker.entity';
import { CreateWorkerInput } from './dto/create-worker.input';
import { UpdateWorkerInput } from './dto/update-worker.input';
import { AppConstants } from 'src/app-constants';
import { ClassSerializerInterceptor, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserPolicy } from 'src/auth/policy/user-policy.decorator';
import { UserPolicyGuard } from 'src/auth/policy/user-policy.guard';
import { AbilityActions } from 'src/auth/policy/user-ability.factory';

@Resolver(() => Worker)
@UseInterceptors(ClassSerializerInterceptor)
export class WorkerResolver {
  constructor(private readonly workerService: WorkerService) {}

  @Mutation(() => Worker)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, Worker))
  public createWorker(@Args('createWorkerInput') createWorkerInput: CreateWorkerInput) {
    return this.workerService.create(createWorkerInput);
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
    return this.workerService.findAll(filter, skip, take);
  }

  @Query(() => Worker, { name: 'worker' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, Worker))
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this.workerService.findOne(id);
  }

  @Mutation(() => Worker)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Update, Worker))
  public updateWorker(@Args('updateWorkerInput') updateWorkerInput: UpdateWorkerInput) {
    return this.workerService.update(updateWorkerInput.id, updateWorkerInput);
  }

  @Mutation(() => Worker)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Delete, Worker))
  public removeWorker(@Args('id', { type: () => Int }) id: number) {
    return this.workerService.remove(id);
  }
}
