import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MonthlyTimeReviewService } from './monthly-time-review.service';
import { MonthlyTimeReview } from './entities/monthly-time-review.entity';
import { CreateMonthlyTimeReviewInput } from './dto/create-monthly-time-review.input';
import { UpdateMonthlyTimeReviewInput } from './dto/update-monthly-time-review.input';

@Resolver(() => MonthlyTimeReview)
export class MonthlyTimeReviewResolver {
  constructor(private readonly monthlyTimeReviewService: MonthlyTimeReviewService) {}

  @Mutation(() => MonthlyTimeReview)
  createMonthlyTimeReview(@Args('createMonthlyTimeReviewInput') createMonthlyTimeReviewInput: CreateMonthlyTimeReviewInput) {
    return this.monthlyTimeReviewService.create(createMonthlyTimeReviewInput);
  }

  @Query(() => [MonthlyTimeReview], { name: 'monthlyTimeReview' })
  findAll() {
    return this.monthlyTimeReviewService.findAll();
  }

  @Query(() => MonthlyTimeReview, { name: 'monthlyTimeReview' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.monthlyTimeReviewService.findOne(id);
  }

  @Mutation(() => MonthlyTimeReview)
  updateMonthlyTimeReview(@Args('updateMonthlyTimeReviewInput') updateMonthlyTimeReviewInput: UpdateMonthlyTimeReviewInput) {
    return this.monthlyTimeReviewService.update(updateMonthlyTimeReviewInput.id, updateMonthlyTimeReviewInput);
  }

  @Mutation(() => MonthlyTimeReview)
  removeMonthlyTimeReview(@Args('id', { type: () => Int }) id: number) {
    return this.monthlyTimeReviewService.remove(id);
  }
}
