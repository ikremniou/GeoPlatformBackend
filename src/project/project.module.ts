import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { DataModule } from 'src/data/data.module';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { LocaleModule } from 'src/misc/locale/locale.module';
import { WorkClientModule } from 'src/client/work-client.module';
import { WorkerModule } from 'src/worker/worker.module';

@Module({
  imports: [DataModule, PolicyModule, LocaleModule, WorkClientModule, WorkerModule],
  providers: [ProjectResolver, ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
