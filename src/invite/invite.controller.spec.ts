import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { InviteController } from './invite.controller';
import { InviteService } from './invite.service';

describe('InviteController', () => {
  let controller: InviteController;
  const inviteServiceMock = mock<InviteService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule],
      controllers: [InviteController],
      providers: [{ provide: InviteService, useValue: inviteServiceMock }],
    }).compile();

    controller = module.get<InviteController>(InviteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
