import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { ActivityResolver } from './activity.resolver';
import { ActivityService } from './activity.service';

describe('ActivityResolver', () => {
  let resolver: ActivityResolver;
  const activityServiceMock = mock<ActivityService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityResolver,
        {
          provide: ActivityService,
          useValue: activityServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<ActivityResolver>(ActivityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
