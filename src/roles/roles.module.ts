import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [forwardRef(() => PolicyModule), DataModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
