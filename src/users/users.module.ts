import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [PolicyModule, DataModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
