import { Injectable } from '@nestjs/common';
import { CreateTimeReportInput } from './dto/create-time-report.input';
import { UpdateTimeReportInput } from './dto/update-time-report.input';

@Injectable()
export class TimeReportService {
  create(createTimeReportInput: CreateTimeReportInput) {
    return 'This action adds a new timeReport';
  }

  findAll() {
    return `This action returns all timeReport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timeReport`;
  }

  update(id: number, updateTimeReportInput: UpdateTimeReportInput) {
    return `This action updates a #${id} timeReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeReport`;
  }
}
