import { Test, TestingModule } from '@nestjs/testing';
import { TimeReportResolver } from './time-report.resolver';
import { TimeReportService } from './time-report.service';

describe('TimeReportResolver', () => {
  let resolver: TimeReportResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeReportResolver, TimeReportService],
    }).compile();

    resolver = module.get<TimeReportResolver>(TimeReportResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
