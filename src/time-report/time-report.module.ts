import { Module } from '@nestjs/common';
import { TimeReportService } from './time-report.service';
import { TimeReportResolver } from './time-report.resolver';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [DataModule],
  providers: [TimeReportResolver, TimeReportService],
})
export class TimeReportModule {}
