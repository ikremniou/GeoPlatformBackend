import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { CreateMonthlyTimeReviewInput } from './dto/create-monthly-time-review.input';
import { UpdateMonthlyTimeReviewInput } from './dto/update-monthly-time-review.input';
import { MonthlyTimeReview } from './entities/monthly-time-review.entity';

@Injectable()
export class MonthlyTimeReviewService {
  constructor(private readonly _prisma: PrismaService) {}
  public async create(createMonthlyTimeReviewInput: CreateMonthlyTimeReviewInput): Promise<MonthlyTimeReview> {
    const createdReview = await this._prisma.monthlyTimeReview.create({ data: createMonthlyTimeReviewInput });
    return plainToClass(MonthlyTimeReview, createdReview);
  }

  public async findAll(): Promise<MonthlyTimeReview[]> {
    const reviews = await this._prisma.monthlyTimeReview.findMany();
    return plainToClass(MonthlyTimeReview, reviews);
  }

  public async findOne(id: number): Promise<MonthlyTimeReview> {
    const review = await this._prisma.monthlyTimeReview.findFirst({ where: { id } });
    return plainToClass(MonthlyTimeReview, review);
  }

  public async update(
    id: number,
    updateMonthlyTimeReviewInput: UpdateMonthlyTimeReviewInput,
  ): Promise<MonthlyTimeReview> {
    const updatedReview = await this._prisma.monthlyTimeReview.update({
      where: { id },
      data: updateMonthlyTimeReviewInput,
    });
    return plainToClass(MonthlyTimeReview, updatedReview);
  }

  public async remove(id: number): Promise<MonthlyTimeReview> {
    const deletedReview = await this._prisma.monthlyTimeReview.delete({ where: { id } });
    return plainToClass(MonthlyTimeReview, deletedReview);
  }
}
