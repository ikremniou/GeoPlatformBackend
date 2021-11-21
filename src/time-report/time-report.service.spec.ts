import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { PrismaService } from 'src/data/prisma.service';
import { TimeReportService } from './time-report.service';

describe('TimeReportService', () => {
  let service: TimeReportService;
  const prismaMock = mock<PrismaService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimeReportService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<TimeReportService>(TimeReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
