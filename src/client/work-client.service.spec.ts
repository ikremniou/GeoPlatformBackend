import { Test, TestingModule } from '@nestjs/testing';
import { WorkClientService } from './client.service';

describe('ClientService', () => {
  let service: WorkClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkClientService],
    }).compile();

    service = module.get<WorkClientService>(WorkClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
