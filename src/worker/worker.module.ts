import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerResolver } from './worker.resolver';
import { DataModule } from 'src/data/data.module';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { WorkerPositionModule } from 'src/worker-position/worker-position.module';
import { WorkerCategoryModule } from 'src/worker-category/worker-category.module';

@Module({
  imports: [DataModule, PolicyModule, WorkerCategoryModule, WorkerPositionModule],
  providers: [WorkerResolver, WorkerService],
})
export class WorkerModule {}
