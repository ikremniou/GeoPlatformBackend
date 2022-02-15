import { Module } from '@nestjs/common';
import { TimeReportService } from './time-report.service';
import { TimeReportResolver } from './time-report.resolver';
import { DataModule } from 'src/data/data.module';
import { LocaleModule } from 'src/misc/locale/locale.module';
import { ActivityModule } from 'src/activity/activity.module';
import { WorkerModule } from 'src/worker/worker.module';

@Module({
  imports: [DataModule, LocaleModule, WorkerModule, ActivityModule],
  providers: [TimeReportResolver, TimeReportService],
  exports: [TimeReportService]
})
export class TimeReportModule {}
