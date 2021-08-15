import { Test, TestingModule } from '@nestjs/testing';
import { WorkerResolver } from './worker.resolver';
import { WorkerService } from './worker.service';

describe('WorkerResolver', () => {
  let resolver: WorkerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkerResolver, WorkerService],
    }).compile();

    resolver = module.get<WorkerResolver>(WorkerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
