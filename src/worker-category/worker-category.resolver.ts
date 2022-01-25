import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkerCategoryService } from './worker-category.service';
import { WorkerCategory } from './entities/worker-category.entity';
import { CreateWorkerCategoryInput } from './dto/create-worker-category.input';
import { UpdateWorkerCategoryInput } from './dto/update-worker-category.input';
import { ClassSerializerInterceptor, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserPolicy } from 'src/auth/policy/user-policy.decorator';
import { UserPolicyGuard } from 'src/auth/policy/user-policy.guard';
import { AbilityActions } from 'src/auth/policy/user-ability.factory';

@Resolver(() => WorkerCategory)
@UseInterceptors(ClassSerializerInterceptor)
export class WorkerCategoryResolver {
  constructor(private readonly _categoryService: WorkerCategoryService) {}

  @Mutation(() => WorkerCategory)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, WorkerCategory))
  public createWorkerCategory(@Args('createWorkerCategoryInput') createWorkerCategoryInput: CreateWorkerCategoryInput) {
    return this._categoryService.create(createWorkerCategoryInput);
  }

  @Query(() => [WorkerCategory], { name: 'workerCategories' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, WorkerCategory))
  public findAll(
    @Args('filter', { nullable: true }) filter: string,
    @Args('skip', { nullable: true, type: () => Int }) skip: number,
    @Args('take', { nullable: true, type: () => Int }) take: number,
  ) {
    return this._categoryService.findAll(filter, skip, take);
  }

  @Query(() => WorkerCategory, { name: 'workerCategory' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, WorkerCategory))
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this._categoryService.findOne(id);
  }

  @Mutation(() => WorkerCategory)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Update, WorkerCategory))
  public updateWorkerCategory(@Args('updateWorkerCategoryInput') updateWorkerCategoryInput: UpdateWorkerCategoryInput) {
    return this._categoryService.update(updateWorkerCategoryInput.id, updateWorkerCategoryInput);
  }

  @Mutation(() => WorkerCategory)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Delete, WorkerCategory))
  public removeWorkerCategory(@Args('id', { type: () => Int }) id: number) {
    return this._categoryService.remove(id);
  }
}
