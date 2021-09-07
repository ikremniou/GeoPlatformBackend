import { Injectable } from '@nestjs/common';
import { CreateMonthlyTimeReviewInput } from './dto/create-monthly-time-review.input';
import { UpdateMonthlyTimeReviewInput } from './dto/update-monthly-time-review.input';

@Injectable()
export class MonthlyTimeReviewService {
  create(createMonthlyTimeReviewInput: CreateMonthlyTimeReviewInput) {
    return 'This action adds a new monthlyTimeReview';
  }

  findAll() {
    return `This action returns all monthlyTimeReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monthlyTimeReview`;
  }

  update(id: number, updateMonthlyTimeReviewInput: UpdateMonthlyTimeReviewInput) {
    return `This action updates a #${id} monthlyTimeReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} monthlyTimeReview`;
  }
}
