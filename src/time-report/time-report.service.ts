import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { CreateTimeReportInput } from './dto/create-time-report.input';
import { UpdateTimeReportInput } from './dto/update-time-report.input';
import { TimeReport } from './entities/time-report.entity';

@Injectable()
export class TimeReportService {
  constructor(private readonly _prisma: PrismaService) {}

  public async create(createTimeReportInput: CreateTimeReportInput): Promise<TimeReport> {
    const createdTimeReport = await this._prisma.timeReport.create({ data: createTimeReportInput });
    return plainToClass(TimeReport, createdTimeReport);
  }

  public async findAll(): Promise<TimeReport[]> {
    const timeReports = await this._prisma.timeReport.findMany();
    return plainToClass(TimeReport, timeReports);
  }

  public async findOne(id: Date): Promise<TimeReport> {
    const timeReport = await this._prisma.timeReport.findFirst({ where: { id } });
    return plainToClass(TimeReport, timeReport);
  }

  public async update(id: Date, updateTimeReportInput: UpdateTimeReportInput): Promise<TimeReport> {
    const updatedReport = await this._prisma.timeReport.update({ where: { id }, data: updateTimeReportInput });
    return plainToClass(TimeReport, updatedReport);
  }

  public async remove(id: Date): Promise<TimeReport> {
    const deletedReport = await this._prisma.timeReport.delete({ where: { id } });
    return plainToClass(TimeReport, deletedReport);
  }
}
