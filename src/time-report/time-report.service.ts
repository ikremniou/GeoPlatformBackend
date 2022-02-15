import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { ActivityService } from 'src/activity/activity.service';
import { PrismaService } from 'src/data/prisma.service';
import { ServerBusinessError } from 'src/misc/error/server-business.error';
import { I18nService } from 'src/misc/locale/i18n.service';
import { WorkerService } from 'src/worker/worker.service';
import { CreateTimeReportInput } from './dto/create-time-report.input';
import { UpdateTimeReportInput } from './dto/update-time-report.input';
import { TimeReport } from './entities/time-report.entity';

@Injectable()
export class TimeReportService {
  constructor(
    private readonly _activityService: ActivityService,
    private readonly _workerService: WorkerService,
    private readonly _i18n: I18nService,
    private readonly _prisma: PrismaService,
  ) {}

  public async create(input: CreateTimeReportInput): Promise<TimeReport> {
    this.normalizeReportDate(input);
    await this.validateLinks(input.workerId, input.activityId);
    await this.validateUnique(input.workerId, input.activityId, input.date);
    const createdTimeReport = await this._prisma.timeReport.create({ data: input as any });
    return plainToClass(TimeReport, createdTimeReport);
  }

  public async findAll(filter: any, skip: number, take: number): Promise<TimeReport[]> {
    const timeReports = await this._prisma.timeReport.findMany({ where: filter, skip, take });
    return plainToClass(TimeReport, timeReports);
  }

  public async findOne(id: number): Promise<TimeReport> {
    const timeReport = await this._prisma.timeReport.findFirst({ where: { id } });
    return plainToClass(TimeReport, timeReport);
  }

  public async has(id: number): Promise<boolean> {
    return (await this.findOne(id)) != null;
  }

  public async update(id: number, update: UpdateTimeReportInput): Promise<TimeReport> {
    this.normalizeReportDate(update);
    await Promise.all([this.validateId(id), this.validateLinks(update.workerId, update.activityId)]);

    if (update.activityId || update.workerId || update.date) {
      const entityToUpdate = await this._prisma.timeReport.findUnique({ where: { id } });
      if (
        update.activityId != entityToUpdate.activityId ||
        update.workerId != entityToUpdate.workerId ||
        update.date != entityToUpdate.date
      ) {
        await this.validateUnique(
          update.workerId ?? entityToUpdate.workerId,
          update.activityId ?? entityToUpdate.activityId,
          update.date ?? entityToUpdate.date,
        );
      }
    }

    const updatedReport = await this._prisma.timeReport.update({
      where: { id },
      data: update as Prisma.TimeReportUncheckedUpdateInput,
    });
    return plainToClass(TimeReport, updatedReport);
  }

  public async remove(id: number): Promise<TimeReport> {
    await this.validateId(id);
    const deletedReport = await this._prisma.timeReport.delete({ where: { id } });
    return plainToClass(TimeReport, deletedReport);
  }

  private async validateLinks(workerId?: number, activityId?: number): Promise<void> {
    if (workerId && !this._workerService.has(workerId)) {
      throw new ServerBusinessError(this._i18n.get('TimeReport_WorkerDoesNotExist', workerId));
    }
    if (activityId && !this._activityService.has(workerId)) {
      throw new ServerBusinessError(this._i18n.get('TimeReport_ActivityDoesNotExist', activityId));
    }
  }

  private async validateId(timeReportId: number): Promise<void> {
    if (!(await this._prisma.timeReport.findUnique({ where: { id: timeReportId } }))) {
      throw new ServerBusinessError(this._i18n.get('TimeReport_InvalidId', timeReportId));
    }
  }

  private async validateUnique(workerId: number, activityId: number, date: Date): Promise<void> {
    const unique = await this._prisma.timeReport.findUnique({
      where: {
        date_workerId_activityId: {
          activityId,
          workerId,
          date,
        },
      },
    });

    if (unique) {
      throw new ServerBusinessError(this._i18n.get('TimeReport_DateWorkerIdActivityIdIsNotUnique', date));
    }
  }

  private normalizeReportDate(objectWithDate: { date?: Date }): void {
    objectWithDate.date?.setMilliseconds(0);
    objectWithDate.date?.setSeconds(0);
    objectWithDate.date?.setMinutes(0);
    objectWithDate.date?.setHours(0);
  }
}
