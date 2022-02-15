import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { ServerBusinessError } from 'src/misc/error/server-business.error';
import { I18nService } from 'src/misc/locale/i18n.service';
import { CreateActivityInput } from './dto/create-activity.input';
import { UpdateActivityInput } from './dto/update-activity.input';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(private readonly _i18n: I18nService, private readonly _prisma: PrismaService) {}

  public async create(createActivityInput: CreateActivityInput): Promise<Activity> {
    await this.validateUnique(createActivityInput.projectId, createActivityInput.summary);
    const createdActivity = await this._prisma.activity.create({ data: createActivityInput });
    return plainToClass(Activity, createdActivity);
  }

  public async findAll(filter: any, skip: number, take: number): Promise<Activity[]> {
    const activities = await this._prisma.activity.findMany({ where: filter, skip, take });
    return plainToClass(Activity, activities);
  }

  public async findOne(id: number): Promise<Activity> {
    const activity = await this._prisma.activity.findUnique({ where: { id } });
    return plainToClass(Activity, activity);
  }

  public async has(id: number): Promise<boolean> {
    return (await this.findOne(id)) != null;
  }

  public async update(id: number, updateActivityInput: UpdateActivityInput): Promise<Activity> {
    await this.validateId(id);
    await this.validateUpdate(id, updateActivityInput.projectId, updateActivityInput.summary);
    const updatedActivity = await this._prisma.activity.update({ where: { id }, data: updateActivityInput });
    return plainToClass(Activity, updatedActivity);
  }

  public async remove(id: number): Promise<Activity> {
    await this.validateId(id);
    const deletedActivity = await this._prisma.activity.delete({ where: { id } });
    return plainToClass(Activity, deletedActivity);
  }

  private async validateId(id?: number): Promise<void> {
    if (!id || !(await this._prisma.activity.findUnique({ where: { id } }))) {
      throw new ServerBusinessError(this._i18n.get('Activity_InvalidId', id));
    }
  }

  private async validateUnique(projectId: number, summary: string): Promise<void> {
    if (await this._prisma.activity.findUnique({ where: { summary_projectId: { projectId, summary } } })) {
      throw new ServerBusinessError(this._i18n.get('Activity_ProjectIdAndSummaryExists', projectId, summary));
    }
  }

  private async validateUpdate(id: number, projectId?: number, summary?: string): Promise<void> {
    if (!projectId && !summary) {
      return;
    }

    const activity = await this._prisma.activity.findUnique({ where: { id } });
    if (activity.summary === summary && activity.projectId === projectId) {
      return;
    }

    projectId = projectId ?? activity.projectId;
    summary = summary ?? activity.summary;

    await this.validateUnique(projectId, summary);
  }
}
