import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TransformPlainToClass } from 'class-transformer';
import { PrismaService } from 'src/data/prisma.service';
import { ServerBusinessError } from 'src/misc/error/server-business.error';
import { I18nService } from 'src/misc/locale/i18n.service';
import { CreateWorkerCategoryInput } from './dto/create-worker-category.input';
import { UpdateWorkerCategoryInput } from './dto/update-worker-category.input';
import { WorkerCategory } from './entities/worker-category.entity';

@Injectable()
export class WorkerCategoryService {
  constructor(private readonly _i18n: I18nService, private readonly _prisma: PrismaService) {}

  @TransformPlainToClass(WorkerCategory)
  public async create(input: CreateWorkerCategoryInput): Promise<WorkerCategory> {
    await this.validateUniqueName(input.name);
    return this._prisma.workerCategory.create({ data: input });
  }

  @TransformPlainToClass(WorkerCategory)
  public findAll(filter?: string, skip?: number, take?: number): Promise<WorkerCategory[]> {
    let whereFilter: Prisma.WorkerCategoryWhereInput;
    if (filter) {
      whereFilter = JSON.parse(filter);
    }

    return this._prisma.workerCategory.findMany({ where: whereFilter, skip, take });
  }

  @TransformPlainToClass(WorkerCategory)
  public findOne(id: number): Promise<WorkerCategory> {
    return this._prisma.workerCategory.findUnique({ where: { id } });
  }

  @TransformPlainToClass(WorkerCategory)
  public async update(id: number, update: UpdateWorkerCategoryInput): Promise<WorkerCategory> {
    await this.validateId(id);
    if (update.name) {
      await this.validateUniqueName(update.name);
    }

    return this._prisma.workerCategory.update({ where: { id }, data: update });
  }

  @TransformPlainToClass(WorkerCategory)
  public async remove(id: number): Promise<WorkerCategory> {
    await this.validateId(id);
    return this._prisma.workerCategory.delete({ where: { id } });
  }

  private async validateId(id: number): Promise<void> {
    const category = await this._prisma.workerCategory.findUnique({ where: { id } });
    if (!category) {
      throw new ServerBusinessError(this._i18n.get('WorkerCategory_InvalidId', id));
    }
  }

  private async validateUniqueName(name: string) {
    if (await this._prisma.workerCategory.findUnique({ where: { name } })) {
      throw new ServerBusinessError(this._i18n.get('WorkerCategory_NameIsNotUnique', name));
    }
  }
}
