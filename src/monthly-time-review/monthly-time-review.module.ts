import { Module } from '@nestjs/common';
import { MonthlyTimeReviewService } from './monthly-time-review.service';
import { MonthlyTimeReviewResolver } from './monthly-time-review.resolver';
import { DataModule } from 'src/data/data.module';
import { PolicyModule } from 'src/auth/policy/policy.module';

@Module({
  imports: [DataModule, PolicyModule],
  providers: [MonthlyTimeReviewResolver, MonthlyTimeReviewService],
})
export class MonthlyTimeReviewModule {}
