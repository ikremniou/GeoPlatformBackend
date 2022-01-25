import { Module } from '@nestjs/common';
import { WorkerCategoryService } from './worker-category.service';
import { WorkerCategoryResolver } from './worker-category.resolver';
import { LocaleModule } from 'src/misc/locale/locale.module';
import { DataModule } from 'src/data/data.module';
import { PolicyModule } from 'src/auth/policy/policy.module';

@Module({
  imports: [LocaleModule, DataModule, PolicyModule],
  providers: [WorkerCategoryResolver, WorkerCategoryService]
})
export class WorkerCategoryModule {}
