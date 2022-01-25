import { Test, TestingModule } from '@nestjs/testing';
import { WorkerPositionResolver } from './worker-position.resolver';
import { WorkerPositionService } from './worker-position.service';

describe('WorkerPositionResolver', () => {
  let resolver: WorkerPositionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkerPositionResolver, WorkerPositionService],
    }).compile();

    resolver = module.get<WorkerPositionResolver>(WorkerPositionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
