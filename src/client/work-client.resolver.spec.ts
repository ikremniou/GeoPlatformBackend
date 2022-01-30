import { Test, TestingModule } from '@nestjs/testing';
import { WorkClientResolver } from './work-client.resolver';
import { WorkClientService } from './client.service';

describe('ClientResolver', () => {
  let resolver: WorkClientResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkClientResolver, WorkClientService],
    }).compile();

    resolver = module.get<WorkClientResolver>(WorkClientResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
