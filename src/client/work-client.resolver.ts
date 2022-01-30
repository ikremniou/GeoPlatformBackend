import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkClientService } from './work-client.service';
import { WorkClient } from './entities/work-client.entity';
import { CreateWorkClientInput } from './dto/create-work-client.input';
import { UpdateWorkClientInput } from './dto/update-work-client.input';
import { ClassSerializerInterceptor, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserPolicyGuard } from 'src/auth/policy/user-policy.guard';
import { UserPolicy } from 'src/auth/policy/user-policy.decorator';
import { AbilityActions } from 'src/auth/policy/user-ability.factory';

@Resolver(() => WorkClient)
@UseInterceptors(ClassSerializerInterceptor)
export class WorkClientResolver {
  constructor(private readonly clientService: WorkClientService) {}

  @Mutation(() => WorkClient)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, WorkClient))
  public createWorkClient(@Args('createWorkClientInput') createClientInput: CreateWorkClientInput) {
    return this.clientService.create(createClientInput);
  }

  @Query(() => [WorkClient], { name: 'workClients' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, WorkClient))
  public findAll(
    @Args('filter', { nullable: true }) filter: string,
    @Args('skip', { nullable: true, type: () => Int }) skip: number,
    @Args('take', { nullable: true, type: () => Int }) take: number,
  ) {
    if (filter) {
      filter = JSON.parse(filter);
    }

    return this.clientService.findAll(filter, skip, take);
  }

  @Query(() => WorkClient, { name: 'workClient' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, WorkClient))
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this.clientService.findOne(id);
  }

  @Mutation(() => WorkClient)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Update, WorkClient))
  public updateWorkClient(@Args('updateWorkClientInput') updateClientInput: UpdateWorkClientInput) {
    return this.clientService.update(updateClientInput.id, updateClientInput);
  }

  @Mutation(() => WorkClient)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Delete, WorkClient))
  public removeWorkClient(@Args('id', { type: () => Int }) id: number) {
    return this.clientService.remove(id);
  }
}
