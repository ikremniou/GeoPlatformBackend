import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { DataModule } from 'src/data/data.module';

@Module({
  imports:[PolicyModule, DataModule],
  controllers: [InviteController],
  providers: [InviteService]
})
export class InviteModule {}
