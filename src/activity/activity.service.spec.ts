import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import { mock } from 'jest-mock-extended';
import { PrismaService } from 'src/data/prisma.service';

describe('ActivityService', () => {
  let service: ActivityService;
  const prismaMock = mock<PrismaService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
