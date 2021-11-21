import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkerService } from './worker.service';
import { Worker } from './entities/worker.entity';
import { CreateWorkerInput } from './dto/create-worker.input';
import { UpdateWorkerInput } from './dto/update-worker.input';
import { PublicRoute } from 'src/misc/decorators/public-path.decorator';
import { AppConstants } from 'src/app-constants';
import { WorkerFilterInput } from './dto/worker-filter-input';

@PublicRoute()
@Resolver(() => Worker)
export class WorkerResolver {
  constructor(private readonly workerService: WorkerService) {}

  @Mutation(() => Worker)
  public createWorker(@Args('createWorkerInput') createWorkerInput: CreateWorkerInput) {
    return this.workerService.create(createWorkerInput);
  }

  @Query(() => [Worker], { name: 'workers' })
  public findAll(
    @Args('filter', { nullable: true }) filter: WorkerFilterInput,
    @Args('skip', { nullable: true, type: () => Int }) skip: number,
    @Args('take', { nullable: true, type: () => Int }) take: number,
  ): Promise<Worker[]> {
    if (!take) {
      take = AppConstants.defaultTakeLimit;
    }
    return this.workerService.findAll(filter, skip, take);
  }

  @Query(() => Worker, { name: 'worker' })
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this.workerService.findOne(id);
  }

  @Mutation(() => Worker)
  public updateWorker(@Args('updateWorkerInput') updateWorkerInput: UpdateWorkerInput) {
    return this.workerService.update(updateWorkerInput.id, updateWorkerInput);
  }

  @Mutation(() => Worker)
  public removeWorker(@Args('id', { type: () => Int }) id: number) {
    return this.workerService.remove(id);
  }
}
