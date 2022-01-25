import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MonthlyTimeReviewService } from './monthly-time-review.service';
import { MonthlyTimeReview } from './entities/monthly-time-review.entity';
import { CreateMonthlyTimeReviewInput } from './dto/create-monthly-time-review.input';
import { UpdateMonthlyTimeReviewInput } from './dto/update-monthly-time-review.input';
import { ClassSerializerInterceptor, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserPolicyGuard } from 'src/auth/policy/user-policy.guard';
import { UserPolicy } from 'src/auth/policy/user-policy.decorator';
import { AbilityActions } from 'src/auth/policy/user-ability.factory';

@Resolver(() => MonthlyTimeReview)
@UseInterceptors(ClassSerializerInterceptor)
export class MonthlyTimeReviewResolver {
  constructor(private readonly monthlyTimeReviewService: MonthlyTimeReviewService) {}

  @Mutation(() => MonthlyTimeReview)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Create, MonthlyTimeReview))
  public createMonthlyTimeReview(
    @Args('createMonthlyTimeReviewInput') createMonthlyTimeReviewInput: CreateMonthlyTimeReviewInput,
  ): Promise<MonthlyTimeReview> {
    return this.monthlyTimeReviewService.create(createMonthlyTimeReviewInput);
  }

  @Query(() => [MonthlyTimeReview], { name: 'monthlyTimeReviews' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, MonthlyTimeReview))
  public findAll(): Promise<MonthlyTimeReview[]> {
    return this.monthlyTimeReviewService.findAll();
  }

  @Query(() => MonthlyTimeReview, { name: 'monthlyTimeReview' })
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Read, MonthlyTimeReview))
  public findOne(@Args('id', { type: () => Int }) id: number): Promise<MonthlyTimeReview> {
    return this.monthlyTimeReviewService.findOne(id);
  }

  @Mutation(() => MonthlyTimeReview)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Update, MonthlyTimeReview))
  public updateMonthlyTimeReview(
    @Args('updateMonthlyTimeReviewInput') updateMonthlyTimeReviewInput: UpdateMonthlyTimeReviewInput,
  ): Promise<MonthlyTimeReview> {
    return this.monthlyTimeReviewService.update(updateMonthlyTimeReviewInput.id, updateMonthlyTimeReviewInput);
  }

  @Mutation(() => MonthlyTimeReview)
  @UseGuards(UserPolicyGuard)
  @UserPolicy((ability) => ability.can(AbilityActions.Delete, MonthlyTimeReview))
  public removeMonthlyTimeReview(@Args('id', { type: () => Int }) id: number): Promise<MonthlyTimeReview> {
    return this.monthlyTimeReviewService.remove(id);
  }
}
