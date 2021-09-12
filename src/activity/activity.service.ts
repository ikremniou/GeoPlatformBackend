import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { CreateActivityInput } from './dto/create-activity.input';
import { UpdateActivityInput } from './dto/update-activity.input';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(private readonly _prisma: PrismaService) {}

  public async create(createActivityInput: CreateActivityInput): Promise<Activity> {
    const createdActivity = await this._prisma.activity.create({ data: createActivityInput });
    return plainToClass(Activity, createdActivity);
  }

  public async findAll(): Promise<Activity[]> {
    const activities = await this._prisma.activity.findMany();
    return plainToClass(Activity, activities);
  }

  public async findOne(id: number): Promise<Activity> {
    const activity = await this._prisma.activity.findFirst({ where: { id } });
    return plainToClass(Activity, activity);
  }

  public async update(id: number, updateActivityInput: UpdateActivityInput): Promise<Activity> {
    const updatedActivity = await this._prisma.activity.update({ where: { id }, data: updateActivityInput });
    return plainToClass(Activity, updatedActivity);
  }

  public async remove(id: number): Promise<Activity> {
    const deletedActivity = await this._prisma.activity.delete({ where: { id } });
    return plainToClass(Activity, deletedActivity);
  }
}
