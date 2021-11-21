import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const userServiceMock = mock<UsersService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PolicyModule],
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: userServiceMock }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
