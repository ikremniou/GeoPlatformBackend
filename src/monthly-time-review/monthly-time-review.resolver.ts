import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MonthlyTimeReviewService } from './monthly-time-review.service';
import { MonthlyTimeReview } from './entities/monthly-time-review.entity';
import { CreateMonthlyTimeReviewInput } from './dto/create-monthly-time-review.input';
import { UpdateMonthlyTimeReviewInput } from './dto/update-monthly-time-review.input';
import { PublicRoute } from 'src/misc/decorators/public-path.decorator';

@PublicRoute()
@Resolver(() => MonthlyTimeReview)
export class MonthlyTimeReviewResolver {
  constructor(private readonly monthlyTimeReviewService: MonthlyTimeReviewService) {}

  @Mutation(() => MonthlyTimeReview)
  public createMonthlyTimeReview(
    @Args('createMonthlyTimeReviewInput') createMonthlyTimeReviewInput: CreateMonthlyTimeReviewInput,
  ): Promise<MonthlyTimeReview> {
    return this.monthlyTimeReviewService.create(createMonthlyTimeReviewInput);
  }

  @Query(() => [MonthlyTimeReview], { name: 'monthlyTimeReviews' })
  public findAll(): Promise<MonthlyTimeReview[]> {
    return this.monthlyTimeReviewService.findAll();
  }

  @Query(() => MonthlyTimeReview, { name: 'monthlyTimeReview' })
  public findOne(@Args('id', { type: () => Int }) id: number): Promise<MonthlyTimeReview> {
    return this.monthlyTimeReviewService.findOne(id);
  }

  @Mutation(() => MonthlyTimeReview)
  public updateMonthlyTimeReview(
    @Args('updateMonthlyTimeReviewInput') updateMonthlyTimeReviewInput: UpdateMonthlyTimeReviewInput,
  ): Promise<MonthlyTimeReview> {
    return this.monthlyTimeReviewService.update(updateMonthlyTimeReviewInput.id, updateMonthlyTimeReviewInput);
  }

  @Mutation(() => MonthlyTimeReview)
  public removeMonthlyTimeReview(@Args('id', { type: () => Int }) id: number): Promise<MonthlyTimeReview> {
    return this.monthlyTimeReviewService.remove(id);
  }
}
