import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TimeReportService } from './time-report.service';
import { TimeReport } from './entities/time-report.entity';
import { CreateTimeReportInput } from './dto/create-time-report.input';
import { UpdateTimeReportInput } from './dto/update-time-report.input';

@Resolver(() => TimeReport)
export class TimeReportResolver {
  constructor(private readonly timeReportService: TimeReportService) {}

  @Mutation(() => TimeReport)
  createTimeReport(@Args('createTimeReportInput') createTimeReportInput: CreateTimeReportInput) {
    return this.timeReportService.create(createTimeReportInput);
  }

  @Query(() => [TimeReport], { name: 'timeReport' })
  findAll() {
    return this.timeReportService.findAll();
  }

  @Query(() => TimeReport, { name: 'timeReport' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.timeReportService.findOne(id);
  }

  @Mutation(() => TimeReport)
  updateTimeReport(@Args('updateTimeReportInput') updateTimeReportInput: UpdateTimeReportInput) {
    return this.timeReportService.update(updateTimeReportInput.id, updateTimeReportInput);
  }

  @Mutation(() => TimeReport)
  removeTimeReport(@Args('id', { type: () => Int }) id: number) {
    return this.timeReportService.remove(id);
  }
}
