import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';

describe('ClaimsController', () => {
  let controller: ClaimsController;
  const claimsServiceMock = mock<ClaimsService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule],
      controllers: [ClaimsController],
      providers: [
        {
          provide: ClaimsService,
          useValue: claimsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ClaimsController>(ClaimsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
