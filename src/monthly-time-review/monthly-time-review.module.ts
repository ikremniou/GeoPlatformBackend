import { Module } from '@nestjs/common';
import { MonthlyTimeReviewService } from './monthly-time-review.service';
import { MonthlyTimeReviewResolver } from './monthly-time-review.resolver';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [DataModule],
  providers: [MonthlyTimeReviewResolver, MonthlyTimeReviewService],
})
export class MonthlyTimeReviewModule {}
