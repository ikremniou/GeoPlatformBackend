import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { MonthlyTimeReviewResolver } from './monthly-time-review.resolver';
import { MonthlyTimeReviewService } from './monthly-time-review.service';

describe('MonthlyTimeReviewResolver', () => {
  let resolver: MonthlyTimeReviewResolver;
  const monthlyTimeReviewServiceMock = mock<MonthlyTimeReviewService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonthlyTimeReviewResolver,
        { provide: MonthlyTimeReviewService, useValue: monthlyTimeReviewServiceMock },
      ],
    }).compile();

    resolver = module.get<MonthlyTimeReviewResolver>(MonthlyTimeReviewResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
