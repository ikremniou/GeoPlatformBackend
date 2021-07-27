import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { User } from 'src/users/entities/user.entity';
import { Claim } from 'src/claims/entities/claim.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User, Claim]), forwardRef(() => PolicyModule)],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
