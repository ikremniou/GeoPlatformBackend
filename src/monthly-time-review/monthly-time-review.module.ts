import { Module } from '@nestjs/common';
import { MonthlyTimeReviewService } from './monthly-time-review.service';
import { MonthlyTimeReviewResolver } from './monthly-time-review.resolver';

@Module({
  providers: [MonthlyTimeReviewResolver, MonthlyTimeReviewService]
})
export class MonthlyTimeReviewModule {}
