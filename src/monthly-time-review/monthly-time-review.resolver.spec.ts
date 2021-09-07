import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyTimeReviewResolver } from './monthly-time-review.resolver';
import { MonthlyTimeReviewService } from './monthly-time-review.service';

describe('MonthlyTimeReviewResolver', () => {
  let resolver: MonthlyTimeReviewResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthlyTimeReviewResolver, MonthlyTimeReviewService],
    }).compile();

    resolver = module.get<MonthlyTimeReviewResolver>(MonthlyTimeReviewResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
