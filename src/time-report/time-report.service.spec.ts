import { Test, TestingModule } from '@nestjs/testing';
import { TimeReportService } from './time-report.service';

describe('TimeReportService', () => {
  let service: TimeReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeReportService],
    }).compile();

    service = module.get<TimeReportService>(TimeReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
