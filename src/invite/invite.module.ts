import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invite } from './entities/invite.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[PolicyModule, TypeOrmModule.forFeature([Invite, User])],
  controllers: [InviteController],
  providers: [InviteService]
})
export class InviteModule {}
