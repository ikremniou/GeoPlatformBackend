import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkerService } from './worker.service';
import { Worker } from './entities/worker.entity';
import { CreateWorkerInput } from './dto/create-worker.input';
import { UpdateWorkerInput } from './dto/update-worker.input';

@Resolver(() => Worker)
export class WorkerResolver {
  constructor(private readonly workerService: WorkerService) {}

  @Mutation(() => Worker)
  public createWorker(@Args('createWorkerInput') createWorkerInput: CreateWorkerInput) {
    return this.workerService.create(createWorkerInput);
  }

  @Query(() => [Worker], { name: 'worker' })
  public findAll() {
    return this.workerService.findAll();
  }

  @Query(() => Worker, { name: 'worker' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.workerService.findOne(id);
  }

  @Mutation(() => Worker)
  updateWorker(@Args('updateWorkerInput') updateWorkerInput: UpdateWorkerInput) {
    return this.workerService.update(updateWorkerInput.id, updateWorkerInput);
  }

  @Mutation(() => Worker)
  removeWorker(@Args('id', { type: () => Int }) id: number) {
    return this.workerService.remove(id);
  }
}
