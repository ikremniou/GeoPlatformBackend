import { Test, TestingModule } from '@nestjs/testing';
import { WorkerPositionService } from './worker-position.service';

describe('WorkerPositionService', () => {
  let service: WorkerPositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkerPositionService],
    }).compile();

    service = module.get<WorkerPositionService>(WorkerPositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
