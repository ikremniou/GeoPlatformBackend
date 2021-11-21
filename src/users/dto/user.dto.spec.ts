import { Test, TestingModule } from '@nestjs/testing';
import { getFromContainer, useContainer, Validator } from 'class-validator';
import { ValidationModule } from 'src/misc/validation/validation.module';
import { CreateUserDto } from './create-user.dto';

describe('UserDTO', () => {
  let validator: Validator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ValidationModule],
    }).compile();

    useContainer(module, { fallbackOnErrors: true });
    validator = getFromContainer(Validator);
  });

  it('should not create class instance if register token is absent', async () => {
    const user = new CreateUserDto();
    user.email = 'email@email.com';
    user.password = 'password123';
    user.registerToken = '';
    user.username = 'Ilya10';

    const validationResult = await validator.validate(user);
    expect(validationResult).toHaveLength(1);
    expect(validationResult[0].constraints['IsUUIDValidator']).toBeDefined();
    expect(validationResult[0].constraints['IsEmptyValidator']).toBeDefined();
  });

  it('should not create class instance if register token is invalid', async () => {
    const user = new CreateUserDto();
    user.email = 'email@email.com';
    user.password = 'password123';
    user.registerToken = '123123';
    user.username = 'Ilya10';

    const validationResult = await validator.validate(user);
    expect(validationResult).toHaveLength(1);
    expect(validationResult[0].constraints['IsUUIDValidator']).toBeDefined();
  });

  it('should not create class instance if username length invalid #1', async () => {
    const user = new CreateUserDto();
    user.email = 'email@email.com';
    user.password = 'password123';
    user.registerToken = '3422b448-2460-4fd2-9183-8000de6f8343';
    user.username = 'Ily';

    const validationResult = await validator.validate(user);
    expect(validationResult).toHaveLength(1);
    expect(validationResult[0].constraints['LengthValidator']).toBeDefined();
  });

  it('should not create class instance if username length invalid #2', async () => {
    const user = new CreateUserDto();
    user.email = 'email@email.com';
    user.password = 'password123';
    user.registerToken = '3422b448-2460-4fd2-9183-8000de6f8343';
    user.username = 'Ilya1000000000000000000000000000000000000000000000000000000000000000000000000000000';

    const validationResult = await validator.validate(user);
    expect(validationResult).toHaveLength(1);
    expect(validationResult[0].constraints['LengthValidator']).toBeDefined();
  });

  it('should not create class instance if email is invalid', async () => {
    const user = new CreateUserDto();
    user.email = 'email';
    user.password = 'password123';
    user.registerToken = '3422b448-2460-4fd2-9183-8000de6f8343';
    user.username = 'Ilya1000';

    const validationResult = await validator.validate(user);
    expect(validationResult).toHaveLength(1);
    expect(validationResult[0].constraints['IsEmailValidator']).toBeDefined();
  });

  it('should not create class instance if password is invalid', async () => {
    const user = new CreateUserDto();
    user.email = 'email@email.com';
    user.password = 'ааббввггдд';
    user.registerToken = '3422b448-2460-4fd2-9183-8000de6f8343';
    user.username = 'Ilya1000';

    const validationResult = await validator.validate(user);
    expect(validationResult).toHaveLength(1);
    expect(validationResult[0].constraints['IsAsciiValidator']).toBeDefined();
  });
});
