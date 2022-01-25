import { Test, TestingModule } from '@nestjs/testing';
import { WorkerCategoryResolver } from './worker-category.resolver';
import { WorkerCategoryService } from './worker-category.service';

describe('WorkerCategoryResolver', () => {
  let resolver: WorkerCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkerCategoryResolver, WorkerCategoryService],
    }).compile();

    resolver = module.get<WorkerCategoryResolver>(WorkerCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
