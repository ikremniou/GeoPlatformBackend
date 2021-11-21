import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { PrismaService } from 'src/data/prisma.service';
import { MonthlyTimeReviewService } from './monthly-time-review.service';

describe('MonthlyTimeReviewService', () => {
  let service: MonthlyTimeReviewService;
  const prismaMock = mock<PrismaService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonthlyTimeReviewService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<MonthlyTimeReviewService>(MonthlyTimeReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
