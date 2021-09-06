import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerResolver } from './worker.resolver';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [DataModule],
  providers: [WorkerResolver, WorkerService]
})
export class WorkerModule {}
