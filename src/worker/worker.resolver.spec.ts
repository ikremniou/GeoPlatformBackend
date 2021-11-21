import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { WorkerResolver } from './worker.resolver';
import { WorkerService } from './worker.service';

describe('WorkerResolver', () => {
  let resolver: WorkerResolver;
  const workerServiceMock = mock<WorkerService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule],
      providers: [WorkerResolver, { provide: WorkerService, useValue: workerServiceMock }],
    }).compile();

    resolver = module.get<WorkerResolver>(WorkerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
