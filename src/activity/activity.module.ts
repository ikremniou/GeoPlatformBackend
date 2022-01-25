import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityResolver } from './activity.resolver';
import { DataModule } from 'src/data/data.module';
import { PolicyModule } from 'src/auth/policy/policy.module';

@Module({
  imports: [DataModule, PolicyModule],
  providers: [ActivityResolver, ActivityService],
})
export class ActivityModule {}
