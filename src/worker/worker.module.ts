import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerResolver } from './worker.resolver';
import { DataModule } from 'src/data/data.module';
import { PolicyModule } from 'src/auth/policy/policy.module';

@Module({
  imports: [DataModule, PolicyModule],
  providers: [WorkerResolver, WorkerService]
})
export class WorkerModule {}
