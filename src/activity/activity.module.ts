import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityResolver } from './activity.resolver';
import { DataModule } from 'src/data/data.module';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { LocaleModule } from 'src/misc/locale/locale.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [DataModule, PolicyModule, LocaleModule, ProjectModule],
  providers: [ActivityResolver, ActivityService],
  exports: [ActivityService]
})
export class ActivityModule {}
