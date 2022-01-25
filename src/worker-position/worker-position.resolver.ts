import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkerPositionService } from './worker-position.service';
import { WorkerPosition } from './entities/worker-position.entity';
import { CreateWorkerPositionInput } from './dto/create-worker-position.input';
import { UpdateWorkerPositionInput } from './dto/update-worker-position.input';
import { ClassSerializerInterceptor, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserPolicy } from 'src/auth/policy/user-policy.decorator';
import { UserPolicyGuard } from 'src/auth/policy/user-policy.guard';
import { AbilityActions } from 'src/auth/policy/user-ability.factory';

@Resolver(() => WorkerPosition)
@UseInterceptors(ClassSerializerInterceptor)
export class WorkerPositionResolver {
  constructor(private readonly _positionService: WorkerPositionService) {}

  @Mutation(() => WorkerPosition)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, WorkerPosition))
  public createWorkerPosition(@Args('createWorkerPositionInput') createWorkerPositionInput: CreateWorkerPositionInput) {
    return this._positionService.create(createWorkerPositionInput);
  }

  @Query(() => [WorkerPosition], { name: 'workerPositions' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, WorkerPosition))
  public findAll(
    @Args('filter', { nullable: true }) filter: string,
    @Args('skip', { nullable: true, type: () => Int }) skip: number,
    @Args('take', { nullable: true, type: () => Int }) take: number,
  ) {
    return this._positionService.findAll(filter, skip, take);
  }

  @Query(() => WorkerPosition, { name: 'workerPosition' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, WorkerPosition))
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this._positionService.findOne(id);
  }

  @Mutation(() => WorkerPosition)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, WorkerPosition))
  public updateWorkerPosition(@Args('updateWorkerPositionInput') updateWorkerPositionInput: UpdateWorkerPositionInput) {
    return this._positionService.update(updateWorkerPositionInput.id, updateWorkerPositionInput);
  }

  @Mutation(() => WorkerPosition)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, WorkerPosition))
  public removeWorkerPosition(@Args('id', { type: () => Int }) id: number) {
    return this._positionService.remove(id);
  }
}
