import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyTimeReviewService } from './monthly-time-review.service';

describe('MonthlyTimeReviewService', () => {
  let service: MonthlyTimeReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthlyTimeReviewService],
    }).compile();

    service = module.get<MonthlyTimeReviewService>(MonthlyTimeReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
