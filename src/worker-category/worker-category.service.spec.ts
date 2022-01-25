import { Test, TestingModule } from '@nestjs/testing';
import { WorkerCategoryService } from './worker-category.service';

describe('WorkerCategoryService', () => {
  let service: WorkerCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkerCategoryService],
    }).compile();

    service = module.get<WorkerCategoryService>(WorkerCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
