import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TimeReportService } from './time-report.service';
import { TimeReport } from './entities/time-report.entity';
import { CreateTimeReportInput } from './dto/create-time-report.input';
import { UpdateTimeReportInput } from './dto/update-time-report.input';
import { PublicRoute } from 'src/misc/decorators/public-path.decorator';

@PublicRoute()
@Resolver(() => TimeReport)
export class TimeReportResolver {
  constructor(private readonly timeReportService: TimeReportService) {}

  @Mutation(() => TimeReport)
  public createTimeReport(
    @Args('createTimeReportInput') createTimeReportInput: CreateTimeReportInput,
  ): Promise<TimeReport> {
    return this.timeReportService.create(createTimeReportInput);
  }

  @Query(() => [TimeReport], { name: 'timeReports' })
  public findAll(): Promise<TimeReport[]> {
    return this.timeReportService.findAll();
  }

  @Query(() => TimeReport, { name: 'timeReport' })
  public findOne(@Args('id') id: string): Promise<TimeReport> {
    const reportId = new Date(id);
    return this.timeReportService.findOne(reportId);
  }

  @Mutation(() => TimeReport)
  public updateTimeReport(
    @Args('updateTimeReportInput') updateTimeReportInput: UpdateTimeReportInput,
  ): Promise<TimeReport> {
    const timeReportId = new Date(updateTimeReportInput.id);
    return this.timeReportService.update(timeReportId, updateTimeReportInput);
  }

  @Mutation(() => TimeReport)
  public removeTimeReport(@Args('id') id: string): Promise<TimeReport> {
    const timeReportId = new Date(id);
    return this.timeReportService.remove(timeReportId);
  }
}
