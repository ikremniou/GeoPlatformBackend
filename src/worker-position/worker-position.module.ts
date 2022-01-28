import { Module } from '@nestjs/common';
import { WorkerPositionService } from './worker-position.service';
import { WorkerPositionResolver } from './worker-position.resolver';
import { LocaleModule } from 'src/misc/locale/locale.module';
import { DataModule } from 'src/data/data.module';
import { PolicyModule } from 'src/auth/policy/policy.module';

@Module({
  imports: [LocaleModule, DataModule, PolicyModule],
  providers: [WorkerPositionResolver, WorkerPositionService],
  exports: [WorkerPositionService],
})
export class WorkerPositionModule {}
