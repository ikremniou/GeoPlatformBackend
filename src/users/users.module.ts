import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { DataModule } from 'src/data/data.module';
import { ValidationModule } from 'src/misc/validation/validation.module';
import { LocaleModule } from 'src/misc/locale/locale.module';

@Module({
  imports: [PolicyModule, LocaleModule, DataModule, ValidationModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
