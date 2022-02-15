import { Module } from '@nestjs/common';
import { WorkClientService } from './work-client.service';
import { WorkClientResolver } from './work-client.resolver';
import { PolicyModule } from 'src/auth/policy/policy.module';
import { DataModule } from 'src/data/data.module';
import { LocaleModule } from 'src/misc/locale/locale.module';

@Module({
  imports: [PolicyModule, DataModule, LocaleModule],
  providers: [WorkClientResolver, WorkClientService],
  exports: [WorkClientService],
})
export class WorkClientModule {}
