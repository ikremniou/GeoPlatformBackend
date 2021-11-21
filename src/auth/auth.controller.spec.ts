import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const returnToken = {
    token_type: 'bearer',
    access_token: 'ACCESS'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: { 
            login: jest.fn().mockReturnValue(returnToken)
          }
        },
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call AuthService login method on authLocal', async () => {
    const authResult = await controller.authLocal({} as any);
    expect(authResult).toEqual(returnToken);
  });
});
