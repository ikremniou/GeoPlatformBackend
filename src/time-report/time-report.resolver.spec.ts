import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { TimeReportResolver } from './time-report.resolver';
import { TimeReportService } from './time-report.service';

describe('TimeReportResolver', () => {
  let resolver: TimeReportResolver;
  const timeReportServiceMock = mock<TimeReportService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimeReportResolver,
        {
          provide: TimeReportService,
          useValue: timeReportServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<TimeReportResolver>(TimeReportResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
