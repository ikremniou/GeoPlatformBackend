import { Module } from '@nestjs/common';
import { TimeReportService } from './time-report.service';
import { TimeReportResolver } from './time-report.resolver';

@Module({
  providers: [TimeReportResolver, TimeReportService]
})
export class TimeReportModule {}
