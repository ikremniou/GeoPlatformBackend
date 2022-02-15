import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TimeReportService } from './time-report.service';
import { TimeReport } from './entities/time-report.entity';
import { CreateTimeReportInput } from './dto/create-time-report.input';
import { UpdateTimeReportInput } from './dto/update-time-report.input';

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
  public findAll(
    @Args('filter', { nullable: true }) filter: string,
    @Args('skip', { nullable: true, type: () => Int }) skip: number,
    @Args('take', { nullable: true, type: () => Int }) take: number,
  ): Promise<TimeReport[]> {
    if (filter) {
      filter = JSON.parse(filter);
    }
    return this.timeReportService.findAll(filter, skip, take);
  }

  @Query(() => TimeReport, { name: 'timeReport' })
  public findOne(@Args('id') id: number): Promise<TimeReport> {
    return this.timeReportService.findOne(id);
  }

  @Mutation(() => TimeReport)
  public updateTimeReport(
    @Args('updateTimeReportInput') updateTimeReportInput: UpdateTimeReportInput,
  ): Promise<TimeReport> {
    return this.timeReportService.update(updateTimeReportInput.id, updateTimeReportInput);
  }

  @Mutation(() => TimeReport)
  public removeTimeReport(@Args('id') id: number): Promise<TimeReport> {
    return this.timeReportService.remove(id);
  }
}
